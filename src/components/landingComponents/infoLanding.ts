class InfoLanding extends HTMLElement{
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

        <link rel="stylesheet" href="/styles/infoLanding.css">
            <style>
                
            </style>

            <div class="info-container">
                <div class="info-left">

                    <div class="top-text">
                        <div class="image-container">
                            <img src="/images/logos/logo-small.svg" alt="Logo">
                        </div>
                        <div class="text-container">
                            <p>You’re probably wondering...</p>
                            <h1>What can you do in MOODJ?</h1>
                        </div>
                    </div>

                    <div class="bottom-text">

                        <div class="container-one">
                            <div class="container-one-text">
                                <h1>Share your music!</h1>
                                <p>Share your favorite songs along with the emotion you feel when listening to them</p>
                            </div>
                            <div class="container-one-image">
                                <img src="/images/moods2/Happy.svg" alt="Logo">
                            </div>
                        </div>

                        <div class="container-two">
                            <div class="container-two-text">
                                <h1>Share your thoughts</h1>
                                <p>“This song makes me feel kinda blue”</p>
                            </div>
                            <div class="container-two-image">
                                <img src="/images/moods2/Sad.svg" alt="Logo">
                            </div>
                        </div>

                        <div class="container-three">
                            <div class="container-three-text">
                                <h1>Listen to your friend’s taste</h1>
                                <p>“Great song, love your taste!”</p>
                            </div>
                            <div class="container-three-image">
                                <img src="/images/moods2/Angry.svg" alt="Logo">
                            </div>
                        </div>

                    </div>
                </div>

                <div class="info-right">    
                    <div class="info-text">
                        <h1>Analize your moods!</h1>
                        <p>Track your and your friend’s <br> weekly moods.</p>
                    </div>   
                    <div class="info-image">
                        <div class="img-one">
                            <img src="/images/moods2/Love.svg" alt="Logo">
                            <div class="background-one"></div>
                        </div>
                        <div class="img-two">
                            <img src="/images/moods2/Smily.svg" alt="Logo">
                            <div class="background-two"></div>

                        </div>
                        <div class="img-three">
                            <img src="/images/moods2/Worried.svg" alt="Logo">
                            <div class="background-three"></div>

                        </div>
                        
                        
                        
                    </div>

                </div>
                
            </div>

        `
    }
    }

}

export {InfoLanding};