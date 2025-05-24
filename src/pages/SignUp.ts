class SignUp extends HTMLElement{
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
        <sign-up-comp></sign-up-comp>
        <footer-element></footer-element>
        `
    }
    }

}

export {SignUp};