class ProfilePost extends HTMLElement{
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
        <link rel="stylesheet" href="styles/profileComponents/profilePost.css">
        <div class="post-border">
            <div class="post">
                <img src="https://cdn-images.dzcdn.net/images/cover/67bbf9fc8e49fc8d373c91963061572b/1000x1000-000000-80-0-0.jpg" id="song-img">
                <div>
                    <h2 id="song-title">Dance the night</h2>
                    <p id="artist">Dua Lipa</p>
                    <div class="mood-contain">
                        <img src="moods/happymood.svg" id="mood">
                    </div>
                </div>
                
            </div>
        </div>
        `
    }
    }

}

export {ProfilePost};