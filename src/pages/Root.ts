import { State, store } from "../flux/Store";
import { UserActions} from "../flux/Actions";

class Root extends HTMLElement {
    private lastPath: string = '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleRouteChange = this.handleRouteChange.bind(this);
        store.subscribe((state: State) => {
            const newPath = state.currentPath || window.location.pathname;
            if (newPath !== this.lastPath) {
                this.lastPath = newPath;
                this.handleRouteChange(state);
            }
        });
        UserActions.checkAuth();
    }

    connectedCallback() {
        this.render();
        this.handleRouteChange();
    }

    handleRouteChange(state = store.getState()) {
        if (!this.shadowRoot) return;
        const path = state.currentPath || window.location.pathname;
        const content = this.shadowRoot.querySelector('#content');
        if (!content) return;
        content.innerHTML = '';
        
        switch (path) {
            case '/':
                content.innerHTML = `
                    <nav-bar></nav-bar>
                    <home-page></home-page>
                `;
                break;
            case '/home':
                content.innerHTML = `
                    <nav-bar></nav-bar>
                    <home-page></home-page>
                `;
                break;
            case '/login':
                content.innerHTML = `<log-in></log-in>`;
                break;
            case '/signup':
                content.innerHTML = `<sign-up></sign-up>`;
                break;
            case '/profile':
                content.innerHTML = `
                    <nav-bar></nav-bar>
                    <profile-page></profile-page>
                `;
                break;
            case '/stats':
                content.innerHTML = `
                    <nav-bar></nav-bar>
                    <private-stats></private-stats>
                    <footer-element></footer-element>
                `;
                break;
            case '/lists':
                content.innerHTML = `
                    <nav-bar></nav-bar>
                    <user-lists></user-lists>
                    <footer-element></footer-element>
                `;
                break;
            default:
                content.innerHTML = `<h1>404 - Página no encontrada</h1>`;
                break;
        }
    }

    render() {
        if (!this.shadowRoot) return;
        
        this.shadowRoot.innerHTML = `
            <div id="content">
            </div>
        `;
    }
}

export { Root };
