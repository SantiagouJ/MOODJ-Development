import { FormattedPost, Song, Comment } from "../../adapters/adaptData";
import { CommentCard } from "./CommentCard";
class PostCard extends HTMLElement{

    private _data!: FormattedPost;

    set data(value: FormattedPost) {
      this._data = value;
      this.render();
    }
    
    get data(): FormattedPost {
      return this._data;
      
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
    }
    
    render() {
        const { user, post, comments } = this._data;

        if (this.shadowRoot !== null) {
        const songCard = document.createElement('song-card') as HTMLElement & { data: Song & { username: string } };
        songCard.data = {
          ...this._data.song,
          username: this._data.user.username,
        };

        
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/postComponents/postContainer.css">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <div id="overlay-container"></div>
        <div class="container">
        <div class="post-card">
            <div class="post-top">
            <div class="post-topl">
            <div class="profile-pic">
                <img src="${user.profilePicture}" alt="" class="post-profile">
            </div>
            <div class="post-user">
                <h4 class="heading4">${user.name}</h4>
                <p class="smalltext">${user.username}</p>
            </div>
            </div>
            <div class="post-topr">
            <button id="follow-btn">Follow</button>
            </div>
            </div>
            <div class="song-space">
            </div>
    
            <div class="post-interact">
                <div class="interact-one">
                <span class="material-symbols-outlined" id="heart-icon">
                    favorite
                </span>
                <p>${post.likes}</p>
                    
                <span class="material-symbols-outlined" id="comment-icon">
                    chat_bubble
                </span>
                <p>${post.comments}</p>
                </div>
                <div class="interact-two">
                    <span class="material-symbols-outlined" id="send-icon">
                        send
                    </span>
                    <span class="material-symbols-outlined" id="save-icon">
                        bookmark
                    </span>
                </div>
            </div>
                <p class="liked-by"><span style="font-weight:600;">${post.likedby}</span></p>
        </div>
        </div>
    </div>
        `
    const songContainer = this.shadowRoot.querySelector('.song-space');
    songContainer?.appendChild(songCard);
    const overlayContainer = this.shadowRoot!.querySelector('#overlay-container');

    const commentsBtn = this.shadowRoot!.querySelector('#comment-icon');
    commentsBtn?.addEventListener('click', () => {
    this.toggleComments(comments, overlayContainer);
    });

    }
    }

    toggleComments(comments: Comment[], container: Element | null) {
        if (!container) return;

        const existing = container.querySelector('comments-over');
        if (existing) {
            container.innerHTML = '';
            return;
        }
        
        const commentSection = document.createElement('comments-over') as HTMLElement & { data: Comment[] };
        commentSection.data = comments;
        commentSection.setAttribute('pfp', this.data.user.profilePicture)
        commentSection.setAttribute('name', this.data.user.name)
        commentSection.setAttribute('username', this.data.user.username)

        container.appendChild(commentSection);
    }


}

export {PostCard};