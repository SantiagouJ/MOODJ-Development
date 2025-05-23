class OtherProfile extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        this.render()
    }
    render() {
        if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/otherProfile/otherView.css">

        <div class="banner">
        <div class="profile-container">
            <img src="/images/moods/smilypfp.svg" class="profile-pic" />
        </div>
        </div>
            <div class="profile-info">
                <div class="top-profile">
                <div class="other-profile">
                <h1 class="user-name">Santiago</h1>
                <div class="stats">
                    <div>
                    <h2>Followers</h2>
                    <p>42</p>
                    </div>
                    <div>
                    <h2>Posts</h2>
                    <p>2</p>
                    </div>
                    <div>
                    <h2>Following</h2>
                    <p>2</p>
                    </div>
                </div>
                 </div>
        </div>
            <p class="username">@santiti</p>
            <div class="stats">
                <button class="follow-button">Follow</button>
            </div>
        </div>
        <profile-post class="container">
        </profile-post>
        
        `
    }
    }

}

export {OtherProfile};