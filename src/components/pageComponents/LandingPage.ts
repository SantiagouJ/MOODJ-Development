class LandingPage extends HTMLElement{
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
        <banner-landing></banner-landing>
        <info-landing></info-landing>
        <footer-element></footer-element>
        `
    }
    }

}

export {LandingPage};