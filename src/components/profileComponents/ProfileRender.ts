import { NavigationActions } from "../../flux/Actions";
class ProfileRender extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        this.render()
        this.addEventListeners();
    }

    addEventListeners() {
        if (!this.shadowRoot) return;

        const yourStats = this.shadowRoot.querySelector('#your-stats');
        yourStats?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/stats');
        });

        const yourLists = this.shadowRoot.querySelector('#your-lists');
        yourLists?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/lists');
        });

    }

    render() {
        if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/profileComponents/profileView.css">

        <div class="banner">
        <div class="profile-container">
            <img src="/images/moods/smilypfp.svg" class="profile-pic" />
        </div>
        </div>
        <div class="profile-info">
            <div class="top-profile">
            <h1 class="user-name">Kevin</h1>
            <button id="edit-profile">Edit Profile</button>
        </div>
            <p class="username">@odiosyri</p>
            <div class="stats">
                <p><span style="color:white;font-weight:bold;">32</span> Followers</p>
                <p><span style="color:white;font-weight:bold;">10</span> Following</p>
                <p><span style="color:white;font-weight:bold;">2</span> Posts</p>
            </div>
        </div>
        <div class="sections">
            <img src="images/stats/your stats.png" alt="Your Statistics" id="your-stats" class="profile-sections">
            <img src="images/stats/your lists.png" alt="Your Lists" id="your-lists" class="profile-sections">
        </div>
        <profile-post class="container">
        </profile-post>
        
        `
    }
    }

}

export {ProfileRender};