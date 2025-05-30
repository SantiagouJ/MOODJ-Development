import { State, store } from "../flux/Store";
import { UserActions} from "../flux/Actions";
import { loginWithTestUser } from "../services/Firebase/TestUser";

class Root extends HTMLElement {
    private lastPath: string = '';
    private loggedIn = false;

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
            
            this.render();
            
            this.handleRouteChange();
            
            if (!this.loggedIn) {
                await loginWithTestUser();
                this.loggedIn = true;
                this.handleRouteChange();
            }
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
            if (path.startsWith('/publicprofile')) {
                contentHTML = `
                    <nav-bar></nav-bar>
                    <profile-preview></profile-preview>
                    <other-profile></other-profile>
                    <footer-element></footer-element>
                `;
            } else {
                switch (path) {
                    case '/':
                    case '/home':
                        contentHTML = `
                            <nav-bar></nav-bar>
                            <profile-preview></profile-preview>
                            <home-page></home-page>
                        `;
                        break;
                    case '/login':
                        contentHTML = `<log-in></log-in>
                        <footer-element></footer-element>`;
                        break;
                    case '/signup':
                        contentHTML = `<sign-up></sign-up>
                        <footer-element></footer-element>`;
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
