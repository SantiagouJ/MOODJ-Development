import { Comment } from "../../adapters/adaptData";

class CommentsOverlay extends HTMLElement {
  comments: Comment[] = [];

  static get observedAttributes() {
    return ['pfp', 'name', 'username'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(commentsData: Comment[]) {
    this.comments = commentsData;
    this.render();
  }

  connectedCallback() {
    if (this.hasAttribute('name') && this.comments) {
      this.render();
    }

    const overlay = this.shadowRoot?.querySelector('.comments-overlay') as HTMLElement;
    const commentBtn = this.shadowRoot?.querySelector('#post-comment');

    overlay?.addEventListener('click', (event: MouseEvent) => {
      if (event.target === overlay) this.remove();
    });

    commentBtn?.addEventListener('click', () => this.createComment());
  }

  createComment() {
    const input = this.shadowRoot?.querySelector('.write-comment') as HTMLInputElement;
    const inputVal = input?.value.trim();
    if (!inputVal) return;

    const container = this.shadowRoot?.querySelector('.comments');
    const commentCard = this.ownerDocument.createElement('comment-card');
    commentCard.setAttribute('pfp', '/moods/angrypfp.svg');
    commentCard.setAttribute('name', 'Leider');
    commentCard.setAttribute('username', 'leider.js');
    commentCard.setAttribute('comment', inputVal);
    commentCard.setAttribute('likes', '0');

    container?.prepend(commentCard);
    input.value = '';
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .comments-overlay {
            position: fixed;
            z-index: 1000;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .comments-container {
          background: #222;
          border-radius: 32px;
          height: 85vh;
          max-width: 911px;
          max-height: 880px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(0,0,0,0.4);
        }

          .user-area {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(25deg, rgba(192, 109, 255, 0.54) 14.11%, #364EEB 117.36%);
            border-radius: 32px 32px 0 0;
            padding: 16px 24px;
          }

          .profile-box {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .profile-pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #1F1F1F;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .post-profile {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .post-user {
            display: flex;
            flex-direction: column;
          }

          .heading4 {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
            margin: 0;
          }

          .smalltext {
            font-size: 14px;
            color: rgba(255,255,255,0.7);
            margin: 0;
          }

          .blue-btn {
            background: #5267EE;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 8px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }

          .comments {
            flex: 1;
            overflow-y: auto;
            padding: 12px 0;
          }

          .comments::-webkit-scrollbar {
            display: none;
          }

          .new-comment {
            background: #1F1F1F;
            padding: 12px 16px;
            display: flex;
            gap: 12px;
            align-items: center;
            border-radius: 0 0 32px 32px;
          }

          .write-comment {
            flex: 1;
            height: 40px;
            background: #222;
            border: 1px solid #C06DFF;
            border-radius: 8px;
            padding: 0 12px;
            color: #C06DFF;
            font-size: 14px;
            outline: none;
          }

          .write-comment::placeholder {
            color: #C06DFF;
            opacity: 0.6;
          }

          /* Responsive */
          @media (max-width: 480px) {
            .comments-container {
              width: 95%;
              height: 70%;
              border-radius: 24px;
            }

            .heading4 {
              font-size: 16px;
            }

            .smalltext {
              font-size: 13px;
            }

            .blue-btn {
              font-size: 13px;
              padding: 6px 16px;
            }

            .write-comment {
              font-size: 13px;
              height: 36px;
            }   
          }
        </style>

        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

        <div class="comments-overlay">
          <div class="comments-container">
            <div class="user-area">
              <div class="profile-box">
                <div class="profile-pic">
                  <img src="${this.getAttribute('pfp') || 'moods/boredpfp.svg'}" alt="" class="post-profile">
                </div>
                <div class="post-user">
                  <h4 class="heading4">${this.getAttribute('name')}</h4>
                  <p class="smalltext">${this.getAttribute('username')}</p>
                </div>
              </div>
              <button class="blue-btn">Follow</button>
            </div>

            <div class="comments"></div>

            <div class="new-comment">
              <input class="write-comment" placeholder="Write a comment..." />
              <button class="blue-btn" id="post-comment">Publish</button>
            </div>
          </div>
        </div>
      `;

      // Render comentarios existentes
      const container = this.shadowRoot.querySelector('.comments');
      if (!container) return;

      this.comments.forEach((comment) => {
        const commentCard = this.ownerDocument.createElement('comment-card');
        commentCard.setAttribute('pfp', comment.profilePicture);
        commentCard.setAttribute('name', comment.name);
        commentCard.setAttribute('username', comment.username);
        commentCard.setAttribute('comment', comment.comment);
        commentCard.setAttribute('likes', comment.likes.toString());
        container.appendChild(commentCard);
      });
    }
  }
}

export { CommentsOverlay };
