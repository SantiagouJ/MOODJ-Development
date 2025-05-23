class BannerThree extends HTMLElement{
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
        <link rel="stylesheet" href="./styles/bannerThree.css">


       <div class="container-b2">

            <img class="banner2" src="/images/banners/banner-2.svg" alt="">
            <button class="banner2-button">Start your musical diary today</button>

       </div>


        `
    }
    }

}

export {BannerThree};