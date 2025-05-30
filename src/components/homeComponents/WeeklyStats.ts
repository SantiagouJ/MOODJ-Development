class WeeklyStats extends HTMLElement{
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

            <link rel="stylesheet" href="/styles/weeklyStyles.css">

            <div class="statsbox">
            <div class="stats-title">
                <p>Weekly statistics!</p>
            </div>
            <div class="stats-data">
                <div class="happy-data"><p>Happy 40%</p></div>
                <div class="sad-data"><p>Sad 30%</p></div>
                <div class="bored-data"><p>Bored 20%</p></div>
                <div class="angry-data"><p>Angry 10%</p></div>
                <div class="division"><img src="images/stats/Line.svg" alt="line" class="line"></div>
            </div>
            <div class="deco-bubbles">
                <img src="images/stats/mini circles.svg" alt="mini circles" class="mini-circles">
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

        <div class="mobile-stats-data">
                    <div class="mobile-happy-data"><p>Happy 40%</p></div>
                    <div class="mobile-sad-data"><p>Sad 30%</p></div>
                    <div class="mobile-bored-data"><p>Bored 20%</p></div>
                    <div class="mobile-angry-data"><p>Angry 10%</p></div>
                    <div class="mobile-division"></div>
                </div>
            `
        }
    }


}

export {WeeklyStats}