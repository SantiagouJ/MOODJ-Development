import { fetchUser } from "../../services/Firebase/GetUserService";
import { UserType } from "../../utils/types/UserType";

class CommentCard extends HTMLElement {
    private userData: UserType | null = null;
    
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
  async connectedCallback() {
    const userId = this.getAttribute('userId');
    if(userId) {
      this.userData = await fetchUser(userId)
    }
    this.render()
  }
  
    render() {
      if (this.shadowRoot !== null) {

        this.shadowRoot.innerHTML = `
          <style>
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

        #blue-btn {
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
        }

        .comment {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            max-width: 818px;
        }

        .commentl {
            display: flex;
            flex-direction: row;
        }

        .commentr {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-left: auto;
            margin-right: 30px;
            max-width: 100%;
            overflow: hidden;
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
            font-size: 15px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
            max-width: 500px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
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
            gap: 460px;
            position: sticky;
            bottom: 0;
        }

        .write-comment {
            font-size: 24px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            margin-left: 44px;
        }

        /* Estilos responsive */
        @media screen and (max-width: 768px) {
            .comments-container {
                max-width: 100%;
                border-radius: 0;
                height: 100vh;
            }

            .user-area {
                gap: 20px;
                border-radius: 0;
                padding: 0 10px;
            }

            .comment-topl {
                width: 100%;
                border-radius: 0;
            }

            .profile-pic {
                margin-left: 15px;
            }

            .comments {
                margin-left: 15px;
                margin-right: 15px;
            }

            .comment {
                max-width: 100%;
                padding: 12px 0;
            }

            #comment-msg {
                max-width: 100%;
                font-size: 14px;
            }

            .commentr {
                margin-right: 15px;
            }

            .new-comment {
                gap: 20px;
                padding: 0 15px;
            }

            .write-comment {
                margin-left: 15px;
            }
        }

        @media screen and (max-width: 480px) {
            .profile-pic, .profile-pic2 {
                height: 50px;
                width: 50px;
            }

            #comment-name {
                font-size: 18px;
            }

            #comment-user {
                font-size: 14px;
            }

            #comment-num {
                font-size: 18px;
            }

            #heart-icon {
                font-size: 24px;
            }

            .heading4 {
                font-size: 20px;
                margin-left: 15px;
            }

            .smalltext {
                font-size: 14px;
                margin-left: 15px;
            }
        }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

        
                <div class="comment">
                <div class="commentl">
                    <div class="profile-pic2">
                        <img src="${this.userData?.pfp}" alt="" class="comment-profile">
                    </div>
                    <div class="user-info">
                        <h4 id="comment-name">${this.userData?.name}</h4>
                        <p id="comment-user">${this.userData?.username}</p>
                    </div>
                    <p id="comment-msg">${this.getAttribute('comment')}</p>
                </div>
                <div class="commentr">
                    <h4 id="comment-num">${this.getAttribute('likes')}</h4>
                    <span class="material-symbols-outlined" id="heart-icon">
                        favorite
                    </span>
                </div>
                </div>
        `;
      }
    }
  }
  
  export { CommentCard };
  