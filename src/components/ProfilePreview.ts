class ProfilePreview extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.render()
        this.setupListeners()
    }

    setupListeners() {
        const container = this.shadowRoot?.querySelector(".profile-preview")

        window.addEventListener("toggle-profile-preview", () => {
            container?.classList.toggle("active")
        })

        window.addEventListener("click", (event) => {
            const composedPath = event.composedPath()
            const clickedInsidePreview = composedPath.includes(this)
            const navBar = document.querySelector("nav-bar")
            const clickedInPf = navBar?.shadowRoot?.querySelector(".pf")
            const clickedInsidePf = clickedInPf && composedPath.includes(clickedInPf)

            if (!clickedInsidePreview && !clickedInsidePf) {
                container?.classList.remove("active")
            }
        })
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="/styles/profilePreview.css">

                <div class="profile-preview">
                    <div class="usercontainer">
                        <div class="profilepicture"><img src="images/profilePrev/Profilepic.svg" alt=""></div>
                        <div class="user-data">
                            <h3 class="name">Kevin</h3>
                            <h3 class="user">@kevinro</h3>
                        </div>
                    </div>
                    <div class="container-img">
                        <div class="profile-stats"><img src="images/profilePrev/your stats.png" alt="" class="statsimg"></div>
                        <div class="profile-lists"><img src="images/profilePrev/your lists.png" alt="" class="listimg"></div>
                    </div>
                    <div class="sign-out">
                        <button>Sign out</button>
                    </div>
                </div>
            `
        }
    }
}

customElements.define("profile-preview", ProfilePreview)
export { ProfilePreview }
