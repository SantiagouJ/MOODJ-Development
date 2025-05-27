import { State, store } from "../flux/Store";
import { UserActions } from "../flux/Actions";

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleRouteChange = this.handleRouteChange.bind(this);
        store.subscribe((state: State) => this.handleRouteChange(state));
        UserActions.checkAuth();
    }

    connectedCallback() {
        this.render();
        this.handleRouteChange();
    }

    handleRouteChange(state = store.getState()) {
        if (!this.shadowRoot) return;
        const path = state.currentPath || window.location.pathname;
        window.history.replaceState({}, '', path);
        const content = this.shadowRoot.querySelector('#content');
        if (!content) return;
        content.innerHTML = '';
        
        switch (path) {
            case '/':
                content.innerHTML = `<landing-page></landing-page>`;
                break;
            case '/login':
                content.innerHTML = `<log-in></log-in>`;
                break;
            case '/signup':
                content.innerHTML = `<sign-up></sign-up>`;
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
