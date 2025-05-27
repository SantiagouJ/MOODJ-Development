import { loginWithTestUser } from "../services/Firebase/TestUser"

class Root extends HTMLElement{
    private loggedIn = false;
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        if (!this.loggedIn) {
        await loginWithTestUser();
        this.loggedIn = true;
        }
        this.render()
    }
    
    render() {
        if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
            <nav-bar></nav-bar>
            <profile-preview></profile-preview>
            <footer-element></footer-element>
        `
    }
    }

}

export {Root};