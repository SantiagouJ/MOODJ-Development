import { NavigationActions } from "../../flux/Actions";

class NavbarLanding extends HTMLElement {
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback(): void {
      this.render();
      this.addEventListeners();
    }
  
    addEventListeners() {
      if (!this.shadowRoot) return;

      const logo = this.shadowRoot.querySelector('.logo');
      logo?.addEventListener('click', (e) => {
        e.preventDefault();
        NavigationActions.navigate('/');
      });
      
      const mobileLogo = this.shadowRoot.querySelector('.mobile-logo');
      mobileLogo?.addEventListener('click', (e) => {
        e.preventDefault();
        NavigationActions.navigate('/');
      });

      const signUpButton = this.shadowRoot.querySelector('.register-buttons button:last-child');
      signUpButton?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        NavigationActions.navigate('/signup');
      });

      const signInButton = this.shadowRoot.querySelector('.register-buttons button:first-child');
      signInButton?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        NavigationActions.navigate('/login');
      });
    }
  
    render() {
      if (this.shadowRoot){
        
        this.shadowRoot.innerHTML = `
          <link rel="stylesheet" href="/styles/navbarLanding.css">
                              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>

          <div class="navbar">
          
              <img class="logo" src="/images/logos/Logo-medium.svg" alt="Logo">
              <img class="mobile-logo" src="/images/logos/Logo-small.svg" alt="Small-logo">

              <div class="container-right">

                <div class="register-buttons">
                  <button>Sign in</button>
                  <button>Sign up</button>
                </div>

                <div>
                  <span id="menu" class="material-symbols-outlined">menu</span>
                </div>

              </div>
            
          </div>
        `;

      }
    }
}
  
  
export {NavbarLanding};
  