class LogIn extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        this.render()
    }
    render() {
        if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
        <navbar-landing></navbar-landing>
        <log-in-comp></log-in-comp>
        <footer-element></footer-element>
        `
    }
    }

}

export {LogIn};