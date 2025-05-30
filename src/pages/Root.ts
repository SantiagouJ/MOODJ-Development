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

    async connectedCallback() {
        try {
            if (!this.shadowRoot) {
                console.error('Shadow root not available');
                return;
            }
            store.load();
            UserActions.checkAuth();
            this.render();
            this.handleRouteChange();
        } catch (error) {
            console.error('Error in connectedCallback:', error);
        }
    }

    handleRouteChange(state = store.getState()) {
        try {
            if (!this.shadowRoot) {
                console.error('Shadow root not available in handleRouteChange');
                return;
            }
            const path = state.currentPath || window.location.pathname;
            const content = this.shadowRoot.querySelector('#content');
            if(!content) return;

            let contentHTML = '';
            switch (path) {
                case '/':
                case '/landing':
                    contentHTML = `
                        <landing-page></landing-page>
                    `;
                break;
                case '/home':
                    contentHTML = `
                        <nav-bar></nav-bar>
                        <profile-preview></profile-preview>
                        <home-page></home-page>
                        <footer-element></footer-element>
                    `;
                    break;
                case '/login':
                    contentHTML = 
                    `<log-in></log-in>`;
                    break;
                case '/signup':
                    contentHTML = 
                    `<sign-up></sign-up>`;
                    break;
                case '/profile':
                    contentHTML = `
                        <nav-bar></nav-bar>
                        <profile-preview></profile-preview>
                        <profile-page></profile-page>
                        <footer-element></footer-element>
                    `;
                    break;
                case '/stats':
                    contentHTML = `
                        <nav-bar></nav-bar>
                        <profile-preview></profile-preview>
                        <private-stats></private-stats>
                        <footer-element></footer-element>
                    `;
                    break;
                case '/publicprofile':
                    contentHTML = `
                    <nav-bar></nav-bar>
                    <profile-preview></profile-preview>
                    <other-profile></other-profile>
                    <footer-element></footer-element>
                    `;
                    break;
                case '/lists':
                    contentHTML = `
                        <nav-bar></nav-bar>
                        <profile-preview></profile-preview>
                        <user-lists></user-lists>
                        <footer-element></footer-element>
                    `;
                break;
                default:
                    contentHTML = `<h1>404 - Página no encontrada</h1>`;
                    break;
            }

            content.innerHTML = contentHTML;
        } catch (error) {
            console.error('Error in handleRouteChange:', error);
        }
    }

    render() {
        try {
            if (!this.shadowRoot) {
                console.error('Shadow root not available in render');
                return;
            }
            
            this.shadowRoot.innerHTML = `
                <div id="content">
                    <div>Loading...</div>
                </div>
            `;
        } catch (error) {
            console.error('Error in render:', error);
        }
    }
}

export { Root };
