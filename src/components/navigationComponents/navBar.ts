import { NavigationActions } from "../../flux/Actions";
import { store } from "../../flux/Store";
import { State } from "../../flux/Store";
import { searchUsers, getAllUsers } from "../../services/Firebase/SearchUsersService";
import { UserType } from "../../utils/types/UserType";
import { InteractionActions } from "../../flux/Actions";

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
        const menu = this.shadowRoot?.querySelector("#menu");
        if (pf) {
        pf.addEventListener("click", () => {
            queueMicrotask(() => {
                window.dispatchEvent(new CustomEvent("toggle-profile-preview"));
            });
        });
        }
        if (menu) {
            menu.addEventListener("click", () => {
                window.dispatchEvent(new CustomEvent("toggle-profile-preview"));
                console.log("menu");
            });
        }

        // Setup search functionality
        const searchInput = this.shadowRoot?.querySelector("#search-input") as HTMLInputElement;
        const searchDropdown = this.shadowRoot?.querySelector("#search-dropdown") as HTMLElement;
        
        if (searchInput && searchDropdown) {
            let searchTimeout: NodeJS.Timeout;
            
            searchInput.addEventListener("input", (e) => {
                const searchTerm = (e.target as HTMLInputElement).value.trim();
                
                // Clear previous timeout
                clearTimeout(searchTimeout);
                
                if (searchTerm.length === 0) {
                    this.hideSearchDropdown();
                    return;
                }
                
                // Debounce search to avoid too many requests
                searchTimeout = setTimeout(async () => {
                    await this.performSearch(searchTerm);
                }, 300);
            });

            // Hide dropdown when clicking outside
            document.addEventListener("click", (e) => {
                if (!searchInput.contains(e.target as Node) && !searchDropdown.contains(e.target as Node)) {
                    this.hideSearchDropdown();
                }
            });

            // Handle focus events
            searchInput.addEventListener("focus", () => {
                if (searchInput.value.trim().length > 0) {
                    this.performSearch(searchInput.value.trim());
                }
            });
        }
    }

    async performSearch(searchTerm: string) {
        const searchDropdown = this.shadowRoot?.querySelector("#search-dropdown") as HTMLElement;
        if (!searchDropdown) return;

        try {
            // Debug: Get all users first
            const allUsers = await getAllUsers();
            console.log('Debug - All users in database:', allUsers);
            
            const users = await searchUsers(searchTerm, 5);
            this.showSearchResults(users);
        } catch (error) {
            console.error("Error searching users:", error);
            this.hideSearchDropdown();
        }
    }

    showSearchResults(users: UserType[]) {
        const searchDropdown = this.shadowRoot?.querySelector("#search-dropdown") as HTMLElement;
        if (!searchDropdown) return;

        if (users.length === 0) {
            searchDropdown.innerHTML = `
                <div class="search-result-item no-results">
                    <p>No users found</p>
                </div>
            `;
        } else {
            searchDropdown.innerHTML = users.map(user => `
                <div class="search-result-item" data-user-id="${user.id}">
                    <img src="${user.pfp}" alt="${user.name}" class="search-user-avatar">
                    <div class="search-user-info">
                        <h4>${user.name}</h4>
                        <p>@${user.username}</p>
                    </div>
                </div>
            `).join('');

            // Add click listeners to result items
            const resultItems = searchDropdown.querySelectorAll('.search-result-item[data-user-id]');
            resultItems.forEach(item => {
                item.addEventListener('click', () => {
                    const userId = item.getAttribute('data-user-id');
                    if (userId) {
                        this.navigateToUserProfile(userId);
                    }
                });
            });
        }

        searchDropdown.classList.add('show');
    }

    navigateToUserProfile(userId: string) {
        const state = store.getState();
        const loggedUser = state.userProfile;
        
        this.hideSearchDropdown();
        
        if (userId === loggedUser?.id) {
            NavigationActions.navigate('/profile');
        } else {
            InteractionActions.setProfileId(userId);
            NavigationActions.navigate('/publicprofile');
        }
    }

    hideSearchDropdown() {
        const searchDropdown = this.shadowRoot?.querySelector("#search-dropdown");
        if (searchDropdown) {
            searchDropdown.classList.remove('show');
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
                    <input type="search" id="search-input" placeholder="Find users...">
                    <div id="search-dropdown" class="search-dropdown"></div>
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
                this.setupListeners();
                return;
        }

            this.shadowRoot.innerHTML = `

                <link rel="stylesheet" href="/styles/navBar.css">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>

   
            <div class="navbar-home">
                <img class="full-logo" src="/images/logos/Full-logo.svg" alt="">
                <img class="mobile-logo" src="/images/logos/Logo-small.svg" alt="Small-logo">
                <div class="nav-buttons">
                    <button id="home-button">Home</button>
                    <button id="profile-button">Profile</button>

                </div>
                <div class="search">
                    <img class="search-icon" src="/images/icons/search_icon.svg" alt="">
                    <input type="search" id="search-input" placeholder="Find users...">
                    <div id="search-dropdown" class="search-dropdown"></div>
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
                <span id="menu" class="material-symbols-outlined">menu</span>
            </div>
            `;
            this.setupListeners();
            const homeButton = this.shadowRoot.querySelector('#home-button');
        homeButton?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/home');
        });

        const mobileLogo = this.shadowRoot.querySelector('.mobile-logo');
        mobileLogo?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/home');
        });

        const profileButton = this.shadowRoot.querySelector('#profile-button');
        profileButton?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/profile');
        });

        }
    }
}

export { NavBar };