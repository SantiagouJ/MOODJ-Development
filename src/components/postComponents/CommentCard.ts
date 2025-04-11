class CommentCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
          <style>
            .comment {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              padding: 12px 20px;
              gap: 8px;
              width: 100%;
              box-sizing: border-box;
            }
  
            .commentl {
              display: flex;
              flex-direction: row;
              flex: 1;
              gap: 12px;
            }
  
            .profile-pic2 {
              width: 50px;
              height: 50px;
              min-width: 50px;
              border-radius: 50%;
              background-color: #1F1F1F;
              display: flex;
              align-items: center;
              justify-content: center;
            }
  
            .comment-profile {
              width: 40px;
              height: 40px;
              object-fit: cover;
              border-radius: 50%;
            }
  
            .user-info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-top: 2px;
            }
  
            #comment-name {
              color: #FFF;
              font-size: 16px;
              font-weight: 600;
              margin: 0;
              line-height: 1.2;
            }
  
            #comment-user {
              color: rgba(255, 255, 255, 0.62);
              font-size: 14px;
              margin: 0;
            }
  
            #comment-msg {
              color: #FFF;
              font-size: 14px;
              font-weight: 300;
              margin-left: 62px;
              margin-top: 6px;
              word-wrap: break-word;
              max-width: 100%;
            }
  
            .commentr {
              display: flex;
              align-items: center;
              gap: 6px;
              padding-left: 10px;
            }
  
            #comment-num {
              color: #FFF;
              font-size: 16px;
              font-weight: 600;
            }
  
            #heart-icon {
              font-size: 20px;
              color: #fff;
            }
  
            /* Responsive */
            @media (max-width: 480px) {
              .comment {
                flex-direction: column;
                align-items: flex-start;
                padding: 12px;
                gap: 6px;
              }
  
              .commentl {
                flex-direction: row;
                gap: 10px;
                width: 100%;
              }
  
              #comment-msg {
                margin-left: 0;
                margin-top: 6px;
                font-size: 13px;
              }
  
              .commentr {
                align-self: flex-end;
                margin-top: 4px;
              }
  
              #comment-num {
                font-size: 14px;
              }
  
              #heart-icon {
                font-size: 18px;
              }
            }
          </style>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

          <div class="comment">
            <div class="commentl">
              <div class="profile-pic2">
                <img src="${this.getAttribute('pfp')}" alt="pfp" class="comment-profile">
              </div>
              <div class="user-info">
                <h4 id="comment-name">${this.getAttribute('name')}</h4>
                <p id="comment-user">@${this.getAttribute('username')}</p>
              </div>
            </div>
            <p id="comment-msg">${this.getAttribute('comment')}</p>
            <div class="commentr">
              <h4 id="comment-num">${this.getAttribute('likes')}</h4>
              <span class="material-symbols-outlined" id="heart-icon">favorite</span>
            </div>
          </div>
        `;
      }
    }
  }
  
  export { CommentCard };
  