import { store } from "../flux/Store";
import { State } from "../flux/Store";
class Profile extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        store.subscribe((state: State) => {
            this.render(state);
        });
    }
    render(state: State) {

        if (this.shadowRoot !== null) {

            const isAuthenticated = state.isAuthenticated;

        if (!isAuthenticated) {
        this.shadowRoot!.innerHTML = `
            <div class="auth-contain">
            <auth-error></auth-error>
            </div>
        `;
        return;
        }
        this.shadowRoot!.innerHTML = `<div class="profile-wrapper"></div>`;
        const wrapper = this.shadowRoot!.querySelector('.profile-wrapper')!;

        const profileRender = document.createElement('profile-render');
        wrapper.appendChild(profileRender);

    }

}};

export {Profile};