class BannerLanding extends HTMLElement{
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
        <link rel="stylesheet" href="/styles/bannerLanding.css">

        <div class="banner-container">

        <div class = "banner-text">
            <p class="banner-text-welcome">Welcome to</p>
            <img class="banner-logo" src="/images/logos/full-logo.svg" alt="Logo">
            <p class="banner-text-two">Your music diary</p>
            <button class="banner-button">Start now</button>

        </div>

        <div class = "banner-image">
            <img class="banner-image" src="/images/moods/groupmoods.svg" alt="Banner">
        </div>
             
        </div>

        `
    }
    }

}

export {BannerLanding};