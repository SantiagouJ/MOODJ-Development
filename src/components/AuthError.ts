import { NavigationActions } from "../flux/Actions";

class AuthError extends HTMLElement {
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
                        <div class="smalltext"><p>It seems you are not logged in...</p></div>
                        <div class="bigtext-wrap">
                            <div class="bigtext"><p>Please log in to see your content...!</p></div>
                            <div class="error-emoji"><img src="images/moods/erroremoji.svg" alt=""></div>
                        </div>
                        <button id="log-in" class="login-btn">Log in</button>
                    </div>
                        
                </div>

                            `;
    const logBtn = this.shadowRoot.getElementById('log-in');
    logBtn?.addEventListener('click', () => {
      NavigationActions.navigate('/login')
    })
    }
  }
}

export { AuthError };
