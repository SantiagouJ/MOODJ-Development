import { store } from "../flux/Store";
import { State } from "../flux/Store";
import { fetchUser } from "../services/Firebase/GetUserService";
import { fetchPostByUserId } from "../services/Firebase/Profile/GetPostsUserService";
import { PostType } from "../utils/types/PostType";
import { UserType } from "../utils/types/UserType";
import { isFollowing } from "../services/Firebase/Follow/FollowUserService";
import { followUser } from "../services/Firebase/Follow/FollowUserService";
import { unfollowUser } from "../services/Firebase/Follow/FollowUserService";
import { getFollowCount } from "../services/Firebase/Follow/FollowCountService";

class OtherProfile extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        store.subscribe((state: State) => {
            const userId = state.selectedProfile;
            if(!userId) return;
            this.getProfile(userId);
        });
    }

    async getProfile(id: string) {
        const userData = await fetchUser(id);
        if(!userData) return;
        const userPosts = await fetchPostByUserId(id);
        if(!userPosts) return;
        const { followers, following } = await getFollowCount(id);
        this.render(userData, userPosts, followers, following);
    }

    render(data: UserType, posts: PostType[], followers: number, following: number) {
        if (this.shadowRoot !== null) {
        const state = store.getState()
        const loggedUser = state.userProfile?.id;
        if(!loggedUser) return;
        const userId = data.id;
        if(!userId) return;
        const postNumber = posts.length;
        
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/otherProfile/otherView.css">

        <div class="banner">
        <div class="profile-container">
            <img src="${data.pfp}" class="profile-pic"/>
        </div>
        </div>
            <div class="profile-info">
                <div class="top-profile">
                <div class="other-profile">
                <h1 class="user-name">${data.name}</h1>
                <div class="stats">
                    <div>
                    <h2>Followers</h2>
                    <p>${followers}</p>
                    </div>
                    <div>
                    <h2>Posts</h2>
                    <p>${postNumber}</p>
                    </div>
                    <div>
                    <h2>Following</h2>
                    <p>${following}</p>
                    </div>
                </div>
                 </div>
        </div>
            <p class="username">@${data.username}</p>
            <div class="stats">
                <button class="follow-button" id="follow-btn">Follow</button>
            </div>
        </div>
       <div class="container">
        </div>
        `

        const container = this.shadowRoot.querySelector('.container');
            posts.forEach(post => {
                const postEl = document.createElement('profile-post') as HTMLElement;
                postEl.setAttribute('id', post.id);
                postEl.setAttribute('title', post.title);
                postEl.setAttribute('artist', post.artist);
                postEl.setAttribute('album', post.album);
                postEl.setAttribute('audio', post.audio);
                postEl.setAttribute('mood', post.mood);
                postEl.setAttribute('caption', post.caption);
                postEl.setAttribute('userId', post.userId);

                container?.appendChild(postEl);
        });
        
              const followBtn = this.shadowRoot?.querySelector("#follow-btn") as HTMLElement;
              if(followBtn) {
                isFollowing(loggedUser, userId).then((alreadyFollowing) => {
                  followBtn.textContent = alreadyFollowing ? "Following" : "Follow";
                  followBtn.style.backgroundColor = alreadyFollowing ? "#C06DFF" : "#2A2A2A";
                });

                // call firebase to toggle follow or unfollow..
                followBtn.addEventListener("click", async () => {
                  const following = await isFollowing(loggedUser, userId);
                  try {
                    if (following) {
                      await unfollowUser(loggedUser, userId);
                      followBtn.textContent = "Follow";
                      followBtn.style.backgroundColor = "#2A2A2A"
                    } else {
                      await followUser(loggedUser, userId);
                      followBtn.textContent = "Following";
                      followBtn.style.backgroundColor = "#C06DFF"
                    }
                  } catch (e) {
                    console.error("Follow/unfollow failed:", e);
                  }
                });
              }
    }
    }

}

export {OtherProfile};