import { store } from "../../flux/Store";
import { State } from "../../flux/Store";

class ProfileRender extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        store.subscribe((state: State) => {
            this.render(state);
        });
    }
    render(state: State) {
        const user = state.userProfile;

        if (this.shadowRoot !== null) {

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/profileComponents/profileView.css">

        <div class="banner">
        <div class="profile-container">
            <img src="${user?.pfp}" class="profile-pic" />
        </div>
        </div>
        <div class="profile-info">
            <div class="top-profile">
            <h1 class="user-name">${user?.name}</h1>
            <button id="edit-profile">Edit Profile</button>
        </div>
            <p class="username">${user?.username}</p>
            <div class="stats">
                <p><span style="color:white;font-weight:bold;">32</span> Followers</p>
                <p><span style="color:white;font-weight:bold;">10</span> Following</p>
                <p><span style="color:white;font-weight:bold;">2</span> Posts</p>
            </div>
        </div>
        <div class="sections">
            <img src="images/stats/your stats.png" alt="Your Statistics" class="profile-sections">
            <img src="images/stats/your lists.png" alt="Your Lists" class="profile-sections">
        </div>
        <profile-post class="container">
        </profile-post>
        
        `
    }
    }

}

export {ProfileRender};