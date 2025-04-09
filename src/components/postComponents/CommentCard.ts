class CommentCard extends HTMLElement{ 
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
    }
    render() {
        if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/postComponents/postComments.css">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

        
                <div class="comment">
                <div class="commentl">
                    <div class="profile-pic2">
                        <img src="/icons/smily.svg" alt="" class="comment-profile">
                    </div>
                    <div class="user-info">
                        <h4 id="comment-name">Luis F</h4>
                        <p id="comment-user">@terricola.z</p>
                    </div>
                    <p id="comment-msg">This song hits different at night</p>
                </div>
                <div class="commentr">
                    <h4 id="comment-num">20</h4>
                    <span class="material-symbols-outlined" id="heart-icon">
                        favorite
                    </span>
                </div>
                </div>`
    }

}}
export {CommentCard};