class CommentsOverlay extends HTMLElement{ 
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

        
        <div class="comments-overlay">
        <div class="comments-container">
            <div class="user-area">
                <div class="comment-topl">
                    <div class="profile-pic">
                    <img src="/icons/blushing-pfp.svg" alt="" class="post-profile">
                    </div>
                    <div class="post-user">
                    <h4 class="heading4">Santiago</h4>
                    <p class="smalltext">@santiti</p>
                    </div>
                </div>
                <div class="comment-topr">
                    <button id="blue-btn">Follow</button>
                </div>
            </div>
            <div class="comments">
            </div>
            <div class="new-comment">
                <h4 class="write-comment">Write a comment...</h4>
                <button id="blue-btn">Publish</button>
            </div>
        </div>
    </div>`
    const comments = this.shadowRoot.querySelector('.comments');
    const commentCard = document.createElement('comment-card')
    comments?.appendChild(commentCard);
    }

}}
export {CommentsOverlay};