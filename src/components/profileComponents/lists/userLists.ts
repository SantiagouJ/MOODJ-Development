class UserLists extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
    }
    render(){ 
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `

            <link rel="stylesheet" href="/styles/listStyles.css" />

    <div class="playlist-container">
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