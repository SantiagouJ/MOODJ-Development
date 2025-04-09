class PostCard extends HTMLElement{ 
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
        <link rel="stylesheet" href="/styles/postComponents/postContainer.css">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

        <div class="container">
        <div class="post-card">
            <div class="post-top">
            <div class="post-topl">
            <div class="profile-pic">
                <img src="/icons/blushing-pfp.svg" alt="" class="post-profile">
            </div>
            <div class="post-user">
                <h4 class="heading4">Santiago</h4>
                <p class="smalltext">@santiti</p>
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
                <p>134</p>
                    
                <span class="material-symbols-outlined" id="comment-icon">
                    chat_bubble
                </span>
                <p>12</p>
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
                <p class="liked-by">Liked by <span style="font-weight:600;">leiderr.js</span> and 133 more</p>
        </div>
        </div>
    </div>
        `
        const container = this.shadowRoot.querySelector('.song-space');
        const songCard = document.createElement('song-card')
        container?.appendChild(songCard);


    }
    }

}

export {PostCard};