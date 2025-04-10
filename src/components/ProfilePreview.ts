class ProfilePreview extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
    }
    render(){ 
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `

                <link rel="stylesheet" href="/styles/profilePreview.css">


                <div class="profile-preview">
                    <div class="usercontainer">
                    <div class="user-data">
                        <h3 class="name">Kevin</h3>
                        <h3 class="user">@kevinro</h3>
                    </div>
                    <div class="profilepicture"><img src="images/moods/Profilepic.svg" alt=""></div>
                    </div>
                    <div class="profile-stats"><img src="images/moods/your stats.png" alt="" class="statsimg"></div>
                    <div class="profile-lists"><img src="images/moods/your lists.png" alt="" class="listimg"></div>
                    <div class="sign-out">

                    <button>Sing out</button>
        
                    </div>
                </div>
            
            `
        }
    }


}

export {ProfilePreview}