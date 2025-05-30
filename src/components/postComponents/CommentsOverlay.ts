import { createComment } from "../../services/Firebase/Posts/NewCommentService";
import { CommentType } from "../../utils/types/CommentType";
import { fetchComments } from "../../services/Firebase/Posts/GetCommentsService";

class CommentsOverlay extends HTMLElement {

    private comments: CommentType[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

   set data(comments: CommentType[]) {
    this.comments = comments;
  }

  connectedCallback() {
    this.render();
  }

  async createComment() {
    const postId = this.getAttribute('postId');
    if (!postId) return;
    const input = this.shadowRoot?.querySelector('.write-comment') as HTMLInputElement;
    const inputVal = input?.value.trim();
    if (!inputVal) return;

    await createComment(postId, {
    userId: "2PF9LdFvpdNg9o79u7pg",
    content: inputVal,
    likes: 0
    });

    input.value = '';
    this.comments = await fetchComments(postId);
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
        .comments-overlay {
        position: fixed; 
        z-index: 1000;
        display: block;
        width: 100%; 
        height: 100%; 
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5); /* Black background with opacity */
        display: flex;
        align-items: center;
        justify-content: center;
    }

      

    .comments-container::-webkit-scrollbar { 
        display: none;
    }

    .comments-container {
        max-width: 911px;
        max-height: 702px;
        border-radius: 37px;
        background: #222;
        position: relative;
        overflow: scroll;
        
    }

    .user-area {
        height: 98px;
        width: 100%;
        display: flex;
        flex-direction: row;
        border-radius: 35px 35px 0px 0px;
        background: #1F1F1F;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        position: absolute;
        top: 0;
        gap: 390px;

        
    }
    .new-comment {
        height: 98px;
        width: 100%;
        display: flex;
        flex-direction: row;
        border-radius: 0px 0px 35px 35px;
        background: #1F1F1F;
        box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);
        position: absolute;
        bottom: 0;
    }

    .comment-topl {
        display: flex;
        flex-direction: row;
        width: 390px;
        border-radius: 31px 0px 64px 0px;
        background: linear-gradient(25deg, rgba(192, 109, 255, 0.54) 14.11%, #364EEB 117.36%);
    }

    .post-user {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
    }

    .profile-pic {
        background-color: #1F1F1F;
        text-align: center;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.25));
        display: block;
        min-width: 40px;
        min-height: 40px;
        height: 70px;
        width: 70px;
        border-radius: 80px;
        margin-left: 45px;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .post-profile {
        margin-top: 10px;
        min-width: 30px;
        min-height: auto;
    }

    .heading4 {
        margin-left: 24px;
        margin-bottom: 0px;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 23px;
    }

    .smalltext {
        color: rgba(255, 255, 255, 0.62);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 4px;
        margin-left: 24px;
    }

    .comment-topr {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .blue-btn {
        width: 140px;
        margin-right: 33px;
        height: 39px;
        border-radius: 11px;
        background: #5267EE;
        border: none;
        color: white;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-right: 50px;
    }

    .comments {
        margin-top: 150px;
        margin-left: 44px;
        display: flex;
        flex-direction: column;
        min-height: 506px;

    }

    .comment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        gap: 330px;
    }

    .commentl {
        display: flex;
        flex-direction: row;
    }

    .commentr {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
        margin-right: 30px;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        margin-right: 20px;

    }

    #comment-name {
        color: #FFF;
        font-size: 24px;
        font-weight: 600;
        margin: 0px;
    }

    #comment-user {
        color: rgba(255, 255, 255, 0.62);
        font-size: 16px;
        font-weight: 400;
        margin: 2px;
    }

    #comment-msg {
        color: #FFF;
        font-family: Inter;
        font-size: 15px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
    }

    .comment-profile {
        width: 52.791px;
        height: 50px;
    }

    .profile-pic2 {
        background-color: #1F1F1F;
        text-align: center;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.25));
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70px;
        width: 70px;
        border-radius: 80px;
    }

    #comment-num {
        color: #FFF;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-right: 16px;
    }

    #heart-icon {
        font-size: 36px;
        margin-right: 8px;
    }

    .new-comment {
        display: flex;
        align-items: center;
        flex-direction: row;
        position: sticky;
        bottom: 0;


    }
    .write-comment {
    margin-left: 50px;
    margin-right: 300px;
    width: 407px;
    height: 60px;
    border-radius: 6px;
    border: 1px solid #C06DFF;
    background-color: #222222;
    color: #C06DFF;
    outline: none;
    padding: 0px 10px 25px 20px; 
    box-sizing: border-box;
    }
    .write-comment::placeholder {
    font-size: 16px;
    opacity: 0,5;
    color: #C06DFF;

    }

    /* Estilos responsive */
    @media screen and (max-width: 768px) {
        .comments-container {
            max-width: 100%;
            max-height: 75vh;
            height: 75vh;
            border-radius: 20px;
            margin: 0;
        }

        .user-area {
            gap: 20px;
            border-radius: 20px 20px 0 0;
        }

        .new-comment {
            border-radius: 0 0 20px 20px;
        }

        .comment-topl {
            width: 60%;
        }

        .comment-topr {
            padding-right: 15px;
        }

        .blue-btn {
            width: 100px;
            font-size: 16px;
            margin-right: 0;
        }

        .comments {
            margin: 120px 15px 98px 15px;
            min-height: calc(75vh - 218px);
            max-height: calc(75vh - 218px);
            overflow-y: auto;
        }

        .comment {
            gap: 20px;
            padding: 12px 0;
        }

        .write-comment {
            margin: 15px;
            width: calc(100% - 130px);
        }

        #post-comment {
            margin-right: 15px;
        }
    }

    @media screen and (max-width: 480px) {
        .comments-container {
            border-radius: 15px;
        }

        .user-area {
            border-radius: 15px 15px 0 0;
        }

        .new-comment {
            border-radius: 0 0 15px 15px;
        }

        .profile-pic{
            overflow: hidden;
            height: 50px;
            width: 50px;
            margin-left: 15px;
        }

        .heading4 {
            font-size: 20px;
            margin-left: 15px;
        }

        .smalltext {
            font-size: 14px;
            margin-left: 15px;
        }

        .blue-btn {
            width: 80px;
            height: 35px;
            font-size: 14px;
        }

        #comment-name {
            font-size: 18px;
        }

        #comment-user {
            font-size: 14px;
        }

        #comment-msg {
            font-size: 14px;
        }

        .write-comment {
            height: 50px;
            font-size: 14px;
            width: calc(100% - 100px);
        }

        .write-comment::placeholder {
            font-size: 14px;
        }
    }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

        
        <div class="comments-overlay">
        <div class="comments-container">
            <div class="user-area">
                <div class="comment-topl">
                    <div class="profile-pic">
                    <img src="${this.getAttribute('pfp') || 'images/pfp/boredpfp.svg'}" alt="" class="post-profile">
                    </div>
                    <div class="post-user">
                    <h4 class="heading4">${this.getAttribute('name')}</h4>
                    <p class="smalltext">${this.getAttribute('username')}</p>
                    </div>
                </div>
                <div class="comment-topr">
                    <button class="blue-btn">Follow</button>
                </div>
            </div>
            <div class="comments">
            </div>
            <div class="new-comment">
                <input class="write-comment" placeholder="Write a comment..."></input>
                <button class="blue-btn" id="post-comment">Publish</button>
            </div>
        </div>
    </div>
      `;

    const overlay = this.shadowRoot?.querySelector('.comments-overlay') as HTMLElement;
    const commentBtn = this.shadowRoot?.querySelector('#post-comment');

    overlay?.addEventListener('click', (event: MouseEvent) => {
      if (event.target === overlay) this.remove();
    });

    commentBtn?.addEventListener('click', () => this.createComment());

      // Render comentarios existentes
      const container = this.shadowRoot.querySelector('.comments');
      if (!container) return;

      const postId = this.getAttribute('postId');
      this.comments.forEach((comment) => {
        const commentCard = this.ownerDocument.createElement('comment-card');
        commentCard.setAttribute('userId', comment.userId);
        commentCard.setAttribute('comment', comment.content);
        commentCard.setAttribute('likes', comment.likes.toString());
        if (postId) commentCard.setAttribute('postid', postId);
        if (comment.id) commentCard.setAttribute('commentid', comment.id);
        container.appendChild(commentCard);
      });
    }
  }
}

export { CommentsOverlay };
