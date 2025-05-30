import { NavigationActions } from "../../../flux/Actions";

class PrivateStats extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
        this.addEventListeners()
    }

    addEventListeners() {
        if (!this.shadowRoot) return;
        const prevBtn = this.shadowRoot.querySelector('#prev-btn');
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/profile');
        });
    }
    render(){ 
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `

            <link rel="stylesheet" href="/styles/privateStats.css">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />


  <section class="stats-section">
        <span id="prev-btn" class="carousel-prev material-symbols-outlined">keyboard_arrow_left</span>          

    <div class="stats-header">
      <img src="images/stats/left-bubbles.svg" alt="left bubbles" class="bubble-decoration left">
      
      <div class="title-texts">
        <h1 class="main-title">Know your stats!</h1>
        <p class="subtitle">This week you felt:</p>
      </div>
      
      <img src="images/stats/right-bubbles.svg" alt="right bubbles" class="bubble-decoration right">
    </div>

    <div class="statsbox">
      <div class="stats-data">
        <div class="happy-data"><p>Happy 40%</p></div>
        <div class="sad-data"><p>Sad 30%</p></div>
        <div class="bored-data"><p>Bored 20%</p></div>
        <div class="angry-data"><p>Angry 10%</p></div>
        <div class="division">
          <img src="images/stats/Line.svg" alt="line" class="line">
        </div>
      </div>

      <div class="bubble happy">
        <img src="images/stats/yellow circle.svg" alt="Happy face" class="happy-icon">
      </div>
      <div class="bubble sad">
        <img src="images/stats/sad circle.svg" alt="sad face" class="sad-icon">
      </div>
      <div class="bubble bored">
        <img src="images/stats/serious circle.svg" alt="bored face" class="bored-icon">
      </div>
      <div class="bubble angry">
        <img src="images/stats/mad circle.svg" alt="mad face" class="mad-icon">
      </div>
    </div>

    <div class="stats-title">
      <p>You felt mainly
      Happy, and your songs helped
      you express that! </p>
    </div>

    <div class="mobile-stats-data">
      <div class="mobile-happy-data"><p>Happy 40%</p></div>
      <div class="mobile-sad-data"><p>Sad 30%</p></div>
      <div class="mobile-bored-data"><p>Bored 20%</p></div>
      <div class="mobile-angry-data"><p>Angry 10%</p></div>
      <div class="mobile-division"></div>
    </div>
  </section>
            `
        }
    }


}

export {PrivateStats}