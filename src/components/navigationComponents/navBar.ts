import { store } from "../../flux/Store";
import { State } from "../../flux/Store";
class NavBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        store.subscribe((state: State) => {
            this.render(state);
        });        
        
    }

    setupListeners() {
        const pf = this.shadowRoot?.querySelector(".pf");
        if (pf) {
        pf.addEventListener("click", () => {
            queueMicrotask(() => {
                window.dispatchEvent(new CustomEvent("toggle-profile-preview"));
            });
        });
        }
    
    }
    

    render(state:State) {
        if (this.shadowRoot) {
        const profile = state.userProfile;
        const isAuthenticated = state.isAuthenticated;
        if (!isAuthenticated || !profile) {
                this.shadowRoot!.innerHTML = `
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
                        <h4>???</h4>
                        <p>@notloggedin</p>
                    </div>
                    <div class="pfp-container">
                        <img class="pfp" src="/images/moods2/Angry.svg" alt="">
                    </div>
                </div>
            </div>
                `;
                return;
        }

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
                        <h4>${profile.name}</h4>
                        <p>@${profile.username}</p>
                    </div>
                    <div class="pfp-container">
                        <img class="pfp" src="${profile.pfp}" alt="">
                    </div>
                </div>
            </div>
            `;
            this.setupListeners();
        }
    }
}

customElements.define("nav-bar", NavBar);
export { NavBar };
