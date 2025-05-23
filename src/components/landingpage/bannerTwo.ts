class BannerTwo extends HTMLElement{
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
        <link rel="stylesheet" href="./styles/bannerTwo.css">


        <div class="container-b1">

            <img class="left-circles" src="/images/icons/left-circles.svg" alt="">

            <div class="img-b1">

                <img class="banner1" src="/images/banners/banner-1.svg" alt=""> 

                <h2 class="txt-b1">Share your personal<br>musical moods!</h2>

            </div>

            <img class="right-circles" src="/images/icons/right-circles.svg" alt="">
        
        </div>

        <div class="button-container">
            <button class="start-button">Start Now</button>
        </div>

        `
    }
    }

}

export {BannerTwo};