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
        const title = this.getAttribute('title');
        const artist = this.getAttribute('artist');
        const album = this.getAttribute('album');
        const mood = this.getAttribute('mood')
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/profileComponents/profilePost.css">
        <div class="post-border">
            <div class="post">
                <img src="${album}" id="song-img">
                <div>
                    <h2 id="song-title">${title}</h2>
                    <p id="artist">${artist}</p>
                    <div class="mood-contain">
                        <img src="${mood}" id="mood">
                    </div>
                </div>
                
            </div>
        </div>
        `
    }
    }

}

export {ProfilePost};