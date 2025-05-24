
class Profile extends HTMLElement{
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
        <profile-render></profile-render>
        <footer-element></footer-element>

        `
    }
    }

}

export {Profile};