class FooterElement extends HTMLElement {
   
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
        this.render();
    }


        render(){

            if(this.shadowRoot){

                this.shadowRoot.innerHTML = `
            
                <link rel="stylesheet" href="/styles/footer.css">
    
                <footer>

                    <div class="feedback">

                        <p>Feedback & thoughts</p>
                        <textarea placeholder="Text Here..."></textarea>

                    </div>

                    <div class="mobile-layout">

                        <div class="footer-logo">

                            <img src="/logos/Logo-slogan.svg" alt="">
                            
                        </div>

                        <div class="contact">

                            <p>Reach out to our team</p>
                            <p class="email">Moodjteam@gmail.com</p>
                            
                        </div>

                    </div>

                </footer>

                `;

            }
        }
}


export {FooterElement}