class NavBar extends HTMLElement {

    pfp: string = "";
    name: string = "";
    username: string = "";

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    static get observedAttributes() {
        return ["pfp", "name", "username"];
    }


    setupListeners() {
        const pf = this.shadowRoot?.querySelector(".pf");
        if (pf) {
            pf.addEventListener("click", () => {
                window.dispatchEvent(new CustomEvent("toggle-profile-preview"));
            });
        }
    
        const menu = this.shadowRoot?.querySelector(".menu");
        if (menu) {
            menu.addEventListener("click", () => {
                window.dispatchEvent(new CustomEvent("toggle-profile-preview"));
            });
        }
    }
    

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/styles/navBar.css">
   
            <div class="navbar-home">

                <img class="full-logo" src="/images/logos/Full-logo.svg" alt="">
                <img class="mobile-logo" src="/images/logos/Logo-small.svg" alt="Small-logo">

                <div class="nav-buttons">

                    <button>Home</button>
                    <button>Profile</button>

                </div>

                <div class="search">
                
                    <img class="search-icon" src="/images/icons/search_icon.svg" alt="">

                    <input type="search" placeholder="Find users...">

                </div>

                <div class="pf">

                    <div class="user">

                        <h4>Leider</h4>
                        <p>@leider.js</p>

                    </div>

                    <div class="pfp-container">

                        <img class="pfp" src="/images/moods2/Angry.svg" alt="">

                    </div>
                </div>

               
                  <img class="menu" src="/images/icons/Menu-responsive.svg" alt="Menu">
                
    
            </div>
            `;
        }
    }
}

customElements.define("nav-bar", NavBar);
export { NavBar };
