import { fetchUser } from "../../services/Firebase/GetUserService";
import { fetchLikes } from "../../services/Firebase/Posts/GetLikesService";
import { CommentType } from "../../utils/types/CommentType";
import { fetchComments } from "../../services/Firebase/Posts/GetCommentsService";
import { fetchLastLike } from "../../services/Firebase/Posts/LastLikeService";
import { UserType } from "../../utils/types/UserType";
import { InteractionActions, NavigationActions } from "../../flux/Actions";
import { store } from "../../flux/Store";
import { followUser } from "../../services/Firebase/Follow/FollowUserService";
import { isFollowing } from "../../services/Firebase/Follow/FollowUserService";
import { unfollowUser } from "../../services/Firebase/Follow/FollowUserService";
import { createLike, removeLike } from "../../services/Firebase/Posts/NewLikeService";


class PostCard extends HTMLElement {

  private userData: UserType | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Suscribirse específicamente a cambios de likes
    store.subscribe((state) => {
      if (this.userData) {
        const postId = this.getAttribute('id');
        if (postId) {
          const userLike = state.likes.find(like => like.userId === state.userProfile?.id && like.postId === postId);
          const heartIcon = this.shadowRoot?.querySelector('#heart-icon');
          if (userLike) {
            heartIcon?.classList.add('active');
          } else {
            heartIcon?.classList.remove('active');
          }
        }
      }
    }, ['likes']);
  }

  async connectedCallback() {
    const userId = this.getAttribute('userId');
    if (userId) {
      this.userData = await fetchUser(userId)
    }
    this.render()
  }


  async showPostLikes(postId: string) {

    const likesEl = this.shadowRoot?.querySelector("#post-likes");
    if (!likesEl) return;

    const likes = await fetchLikes(postId);
    const totalLikes = likes.length;

    // try catch inside the function and if likes === false return an error.
    likesEl.textContent = `${totalLikes}`;

    const latestLike = await fetchLastLike(postId);

    if (latestLike) {
      const user = await fetchUser(latestLike.userId);
      if (user) {
        const likedByElement = this.shadowRoot?.querySelector('.liked-by');
        likedByElement!.innerHTML = `<span style="font-weight:600;">Liked by</span> ${user.username}`;
      }
    }


  }

  async commentNumber(postId: string) {

    const comments = await fetchComments(postId);
    const totalComments = comments.length;

    const commentsEl = this.shadowRoot?.querySelector("#comments");
    if (!commentsEl) return;
    commentsEl.textContent = `${totalComments}`;

  }

  async toggleComments(postId: string, overlayContainer: HTMLElement, userData: UserType) {
    if (!userData) return;
    const existingOverlay = overlayContainer.querySelector("comments-over");
    if (existingOverlay) {
      overlayContainer.removeChild(existingOverlay);
      return;
    }

    const comments = await fetchComments(postId);
    const commentSection = document.createElement("comments-over") as HTMLElement & {
      data: CommentType[];
    };

    commentSection.data = comments;


    commentSection.setAttribute("pfp", userData.pfp);
    commentSection.setAttribute("name", userData.name);
    commentSection.setAttribute("username", userData.username);
    commentSection.setAttribute("postId", postId);

    overlayContainer.appendChild(commentSection);
  }


  render() {
    if (this.shadowRoot !== null) {
      const state = store.getState();
      const loggedUser = state.userProfile;
      if (!loggedUser) return;
      if (!this.userData) return;
      const { username, name, pfp } = this.userData;
      const userId = this.userData.id;

      const title = this.getAttribute('title');
      const artist = this.getAttribute('artist');
      const album = this.getAttribute('album');
      const audio = this.getAttribute('audio');
      const mood = this.getAttribute('mood')
      const caption = this.getAttribute('caption')
      const postId = this.getAttribute('id');

      if (!postId) return;

      const songCard = document.createElement('song-card') as HTMLElement;
      songCard.setAttribute('title', title || '');
      songCard.setAttribute('artist', artist || '');
      songCard.setAttribute('album', album || '');
      songCard.setAttribute('audio', audio || '');
      songCard.setAttribute('mood', mood || '')
      songCard.setAttribute('caption', caption || '');
      songCard.setAttribute('username', username);


      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/postComponents/postContainer.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
        
        <div id="overlay-container"></div>
        <div class="container">
          <div class="post-card">
            <div class="post-top">
              <div class="post-topl">
                <div class="profile-pic">
                  <img src="${pfp}" alt="" class="post-profile" id="open-profile">
                </div>
                <div class="post-user">
                  <h4 class="heading4">${name}</h4>
                  <p class="smalltext">${username}</p>
                </div>
              </div>
              <div class="post-topr">
                <button id="follow-btn">Follow</button>
              </div>
            </div>

            <div class="song-space"></div>

            <div class="post-interact">
              <div class="interact-one">
                <span class="material-symbols-outlined" id="heart-icon">favorite</span>
                <p id="post-likes">0</p>

                <span class="material-symbols-outlined" id="comment-icon">chat_bubble</span>
                <p id="comments">0</p>
              </div>
              <div class="interact-two">
                <span class="material-symbols-outlined" id="save-icon">bookmark</span>
              </div>
            </div>

            <p class="liked-by"></p>
          </div>
        </div>
      `;

      // Add like/remove like functionality
      const heartIcon = this.shadowRoot.querySelector('#heart-icon');
      heartIcon?.addEventListener('click', async (event) => {
        event.preventDefault();
        const state = store.getState();
        const loggedUser = state.userProfile;
        const postId = this.getAttribute('id');
        if (!loggedUser || !postId) {
          console.error('No hay usuario autenticado o postId');
          return;
        }

        // Buscar si el usuario ya dio like a este post
        const userLike = state.likes.find(like => like.userId === loggedUser.id && like.postId === postId);
        const likesEl = this.shadowRoot?.querySelector("#post-likes");
        const currentLikes = parseInt(likesEl?.textContent || "0");

        // Update UI immediately
        if (userLike) {
          heartIcon?.classList.remove('active');
          if (likesEl) likesEl.textContent = `${currentLikes - 1}`;
        } else {
          heartIcon?.classList.add('active');
          if (likesEl) likesEl.textContent = `${currentLikes + 1}`;
        }

        try {
          if (userLike) {
            await removeLike(userLike);
            console.log('Like eliminado');
          } else {
            const newLike = await createLike(loggedUser.id, postId);
            console.log('Like agregado:', newLike);
          }
        } catch (error) {
          // Revert UI changes if the operation failed
          if (userLike) {
            heartIcon?.classList.add('active');
            if (likesEl) likesEl.textContent = `${currentLikes}`;
          } else {
            heartIcon?.classList.remove('active');
            if (likesEl) likesEl.textContent = `${currentLikes}`;
          }
          console.error('Error al manejar like:', error);
        }
      });
  

      // Show song information
      const songContainer = this.shadowRoot.querySelector('.song-space');
      songContainer?.appendChild(songCard);

      //Show likes through async function! 
      this.showPostLikes(postId);
      //Show how many comments
      this.commentNumber(postId)


      const overlayContainer = this.shadowRoot!.querySelector('#overlay-container') as HTMLElement;
      const commentsBtn = this.shadowRoot!.querySelector('#comment-icon');

      commentsBtn?.addEventListener("click", () => {
        if (!this.userData) return;
        this.toggleComments(postId, overlayContainer, this.userData);
      });


      const saveIcon = this.shadowRoot!.querySelector('#save-icon');

      saveIcon?.addEventListener('click', () => {
        saveIcon.classList.toggle('active');
      });

      //Open user profile

      const openProfile = this.shadowRoot!.querySelector('#open-profile');
      openProfile?.addEventListener('click', () => {
        if (userId === loggedUser?.id) {
          NavigationActions.navigate(`/profile`);
        } else {
          InteractionActions.setProfileId(userId);
          NavigationActions.navigate(`/publicprofile`);
        }
      });

      //Follow functionality
      const followBtn = this.shadowRoot?.querySelector("#follow-btn") as HTMLElement;
      if(followBtn) {
        isFollowing(loggedUser.id, userId).then((alreadyFollowing) => {
          followBtn.textContent = alreadyFollowing ? "Following" : "Follow";
          followBtn.style.backgroundColor = alreadyFollowing ? "#C06DFF" : "#2A2A2A";
          followBtn.style.color = alreadyFollowing ? "white" : "white";
        });

        // call firebase to toggle follow or unfollow..
        followBtn.addEventListener("click", async () => {
          const following = await isFollowing(loggedUser.id, userId);
          if(loggedUser.id != userId) {
            try {
            if (following) {
              await unfollowUser(loggedUser.id, userId);
              followBtn.textContent = "Follow";
              followBtn.style.backgroundColor = "#2A2A2A"
            } else {
              await followUser(loggedUser.id, userId);
              followBtn.textContent = "Following";
              followBtn.style.backgroundColor = "#C06DFF"
            }
          } catch (e) {
            console.error("Follow/unfollow failed:", e);
          }
          }
        });
      }

      // Check initial like state
      if (loggedUser && postId) {
        const userLike = state.likes.find(like => like.userId === loggedUser.id && like.postId === postId);
        if (userLike) {
          heartIcon?.classList.add('active');
        }
      }
    }



    }
  }

export { PostCard };
