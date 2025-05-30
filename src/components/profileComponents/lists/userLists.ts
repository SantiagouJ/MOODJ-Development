import { NavigationActions } from "../../../flux/Actions";

class UserLists extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
        this.handleResponsive()
        this.addEventListeners()
        window.addEventListener('resize', () => this.handleResponsive())
    }

    addEventListeners() {
        if (!this.shadowRoot) return;
        const prevBtn = this.shadowRoot.querySelector('#prev-btn');
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/profile');
        });
    }

    handleResponsive() {
        if (this.shadowRoot) {
            const container = this.shadowRoot.querySelector('.playlist-container')
            const cards = this.shadowRoot.querySelectorAll('.playlist-card')
            const title = this.shadowRoot.querySelector('.playlist-title')
            const emojis = this.shadowRoot.querySelectorAll('.emoji-frame img')

            if (window.innerWidth <= 430) {
                if (container) {
                    container.setAttribute('style', 'width: 100%; max-width: 100%; padding: 0; margin: 0; margin-top: 50px;')
                }
                if (title) {
                    title.setAttribute('style', 'font-size: 24px; margin-bottom: 25px;')
                }
                cards.forEach(card => {
                    card.setAttribute('style', 'width: 85%; height: auto; min-height: 100px; padding: 12px; margin-bottom: 15px; margin-left: auto; margin-right: auto;')
                })
                emojis.forEach(emoji => {
                    emoji.setAttribute('style', 'width: 80px; height: 72px;')
                })
            } else {
                if (container) {
                    container.setAttribute('style', 'width: 100%; max-width: 500px; padding: 0;')
                }
                if (title) {
                    title.setAttribute('style', 'font-size: 36px; margin-bottom: 40px;')
                }
                cards.forEach(card => {
                    card.setAttribute('style', 'width: 454px; height: 142px; padding: 20px; margin-bottom: 20px;')
                })
                emojis.forEach(emoji => {
                    emoji.setAttribute('style', 'width: 143px; height: 127px;')
                })
            }
        }
    }

    render(){ 
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `

            <link rel="stylesheet" href="/styles/listStyles.css" />
              <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

                <link rel="stylesheet" href="/styles/listStyles.css">

    <div class="playlist-container">
    <span id="prev-btn" class="carousel-prev material-symbols-outlined">keyboard_arrow_left</span>          

      <h1 class="playlist-title">My Lists</h1>

      <div class="playlist-card">
        <div class="playlist-info">
          <h2>Happy mood vibes</h2>
          <p>January 2025</p>
          <p>1h duration 161 songs</p>
        </div>
        <div class="emoji-frame">
          <img src="/images/moods/happymood.svg" alt="Happy emoji" />
        </div>
      </div>

      <div class="playlist-card">
        <div class="playlist-info">
          <h2>Coding music</h2>
          <p>March 2025</p>
          <p>2h duration 289 songs</p>
        </div>
        <div class="emoji-frame">
          <img src="/images/moods/sadmood.svg" alt="Sad emoji" />
        </div>
      </div>
    </div>
  </body>
            `
        }
    }
}

export {UserLists}