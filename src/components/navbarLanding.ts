class NavbarLanding extends HTMLElement {
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback(): void {
      this.render();
    }
  
  
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
      if (oldValue !== newValue) {
        (this as any)[name] = newValue;
        this.render();
      }
    }
  
    render() {
      if (this.shadowRoot){
  
        this.shadowRoot.innerHTML = `
          <link rel="stylesheet" href="/styles/navbarLanding.css">
          <div class="navbar">
          
              <img class="logo" src="/logos/Logo-medium.svg" alt="Logo">
              <img class="mobile-logo" src="/logos/Logo-small.svg" alt="Small-logo">

              <div class="container-right">

                <div class="register-buttons">
                  <button>Sign in</button>
                  <button>Sign up</button>
                </div>

                <div>
                  <img class="menu" src="/icons/Menu-responsive.svg" alt="Menu">
                </div>

              </div>
            
          </div>
        `;

      }
    }
}
  
  
export {NavbarLanding};
  