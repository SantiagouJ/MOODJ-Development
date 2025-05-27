import { store } from "../flux/Store";
import { State } from "../flux/Store";

class Home extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    async connectedCallback() {
        store.subscribe((state: State) => {
            this.render(state);
        });
    }

    render(state: State) {

        if (this.shadowRoot !== null) {

        const profile = state.userProfile;
        const isAuthenticated = state.isAuthenticated;

        if (!isAuthenticated || !profile) {
        this.shadowRoot!.innerHTML = `
            <div class="auth-contain">
            <auth-error></auth-error>
            </div>
        `;
        return;
        }
        this.shadowRoot!.innerHTML = `<div class="home-wrapper"></div>`;
        const wrapper = this.shadowRoot!.querySelector('.home-wrapper')!;

        const createPost = document.createElement('create-post');
        createPost.setAttribute('username', profile.name);
        createPost.setAttribute('user-id', profile.id);
        wrapper.appendChild(createPost);

        wrapper.appendChild(document.createElement('carousel-component'));
        wrapper.appendChild(document.createElement('recent-posts'));
        wrapper.appendChild(document.createElement('home-posts'));
        wrapper.appendChild(document.createElement('weekly-stats'));
        wrapper.appendChild(document.createElement('footer-element'));
    


    }
    };
}

export { Home };