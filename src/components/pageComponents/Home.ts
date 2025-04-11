
class Home extends HTMLElement{
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
        <create-post></create-post>
        <carousel-component></carousel-component>
        <recent-posts></recent-posts>
        <home-posts></home-posts>
        <weekly-stats></weekly-stats>
        <footer-element></footer-element>
        `
    }
    }

}

export {Home};