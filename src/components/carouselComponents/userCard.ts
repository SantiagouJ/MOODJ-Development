class UserCard extends HTMLElement {

    name: string = "";
    username: string = "";
    avatar: string = "";
  
  
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
    }
  
    static get observedAttributes() {
      return ["name", "username", "avatar"]
    }
  
    connectedCallback() {
      this.render()
      this.addEventListeners()
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue !== newValue) {
        (this as any)[name] = newValue;
        this.render();
      }
    }
  
    addEventListeners() {
  
      if (this.shadowRoot) {
  
        const followBtn = this.shadowRoot.querySelector(".follow-btn")
        if (followBtn) {
          followBtn.addEventListener("click", () => {
            if (followBtn.textContent === "Follow") {
              followBtn.textContent = "Following"
  
            } else {
              followBtn.textContent = "Follow"
  
            }
          })
        }
  
      }
  
  
    }
  
    render() {
  
      if (this.shadowRoot) {
  
        this.shadowRoot.innerHTML = `
                
          <link rel="stylesheet" href="/styles/moodCarousel.css">
  
              <div class="carousel-card">
                  <div class="user-info">
                      <div class="avatar">
                          <img src="${this.avatar}" alt="${this.name}">
                      </div>
                      <div class="user-details">
                          <h3>${this.name}</h3>
                          <span class="username">${this.username}</span>
                      </div>
                  </div>
                  <button class="follow-btn">Follow</button>
              </div>
          `
  
      }
  
    }
  }
  
  export { UserCard }
  