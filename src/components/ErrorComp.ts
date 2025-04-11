class ErrorMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
                                
                            <link rel="stylesheet" href="styles/errorMessage.css">

    
                <div class="error-box">

                    <div class="info">
                        <div class="smalltext"><p>It seems that you've reached a zone that's still in progress.</p></div>
                        

                        <div class="bigtext-wrap">
                            <div class="bigtext"><p>We'll have it available for you very soon...</p></div>
                            <div class="error-emoji"><img src="images/moods/erroremoji.svg" alt=""></div>
                        </div>
                    </div>
                        
                </div>

                            `;
    }
  }
}

customElements.define("error-message", ErrorMessage);
export { ErrorMessage };
