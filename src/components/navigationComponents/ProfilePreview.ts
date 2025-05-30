import { store } from "../../flux/Store";
import { State } from "../../flux/Store";
import { NavigationActions, UserActions } from "../../flux/Actions";
class ProfilePreview extends HTMLElement {
    private listenersSetup = false;

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        store.subscribe((state: State) => {
            this.render(state);
        });
        if (!this.listenersSetup) {
            this.setupListeners();
            this.listenersSetup = true;
        }
    }

    setupListeners() {

        window.addEventListener("toggle-profile-preview", () => {
            const container = this.shadowRoot?.querySelector(".profile-preview");
            if (!container) return;

            requestAnimationFrame(() => {
                container.classList.toggle("active");
            });
        })

        window.addEventListener("click", (event) => {
            const composedPath = event.composedPath()
            const clickedInsidePreview = composedPath.some(node => node === this);
            const navBar = document.querySelector("nav-bar")
            const clickedInPf = navBar?.shadowRoot?.querySelector(".pf");
            const clickedInMenu = navBar?.shadowRoot?.querySelector(".menu");

            const clickedInsidePf = clickedInPf && composedPath.includes(clickedInPf);
            const clickedInsideMenu = clickedInMenu && composedPath.includes(clickedInMenu);

            if (!clickedInsidePreview && !clickedInsidePf && !clickedInsideMenu) {
                const container = this.shadowRoot?.querySelector(".profile-preview");
                if (!container) return;
                container.classList.remove("active");
            }
        })
    }

    render(state: State) {
        if (this.shadowRoot) {

            const profile = state.userProfile;

            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/styles/profilePreview.css">

                <div class="profile-preview">
                    <div class="usercontainer" id="profile-button">
                        <div class="profilepicture"><img src="${profile?.pfp}" alt=""></div>
                        <div class="user-data">
                            <h3 class="name">${profile?.name}</h3>
                            <h3 class="user">@${profile?.username}</h3>
                        </div>
                    </div>
                    <div class="container-img">
                        <div class="profile-stats" id="your-stats"><img src="/images/icons/your stats.png" alt="" class="statsimg"></div>
                        <div class="profile-lists" id="your-lists"><img src="/images/icons/your lists.png" alt="" class="listimg"></div>
                    </div>
                    <div class="sign-out">
                        <button id="log-out">Sign out</button>
                    </div>
                </div>
            `
            const profileButton = this.shadowRoot.querySelector('#profile-button');
            profileButton?.addEventListener('click', (e) => {
                e.preventDefault();
                NavigationActions.navigate('/profile');
            });

            const logoutButton = this.shadowRoot.querySelector('#log-out');
            logoutButton?.addEventListener('click', (e) => {
                e.preventDefault();
                UserActions.logout();
            })

            const yourStats = this.shadowRoot.querySelector('#your-stats');
            yourStats?.addEventListener('click', (e) => {
                e.preventDefault();
                NavigationActions.navigate('/stats');
            });

            const yourLists = this.shadowRoot.querySelector('#your-lists');
            yourLists?.addEventListener('click', (e) => {
                e.preventDefault();
                NavigationActions.navigate('/lists');
            });
        }
    }
}

export { ProfilePreview }
