class CarouselComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.offsetHeight;
    
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            min-height: 300px;
            visibility: visible;
            opacity: 1;
          }
          
          user-carousel {
            display: block;
            width: 100%;
            min-height: 300px;
            visibility: visible;
            opacity: 1;
          }
        </style>
                    
        <user-carousel></user-carousel>
      `;
    }
  }
}

export { CarouselComponent };