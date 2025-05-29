import { store } from "../../flux/Store";
import { State } from "../../flux/Store";

import { NavigationActions } from "../../flux/Actions";
import { fetchPostByUserId } from "../../services/Firebase/Profile/GetPostsUserService";
import { PostType } from "../../utils/types/PostType";
import { getFollowCount } from "../../services/Firebase/Follow/FollowCountService";
class ProfileRender extends HTMLElement {
    private lastUserId: string | null = null;

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    async connectedCallback() {
        store.subscribe(async (state: State) => {
            const userId = state.userProfile?.id;
            if (!userId || userId === this.lastUserId) return;

            this.lastUserId = userId;
            const posts = await this.loadPosts(userId);
            const { followers, following } = await getFollowCount(userId);

            this.render(state, posts, followers, following);
            this.addEventListeners();
        });
    }

    async loadPosts(userId: string) {
        const data = await fetchPostByUserId(userId); // Firebase call!
        return data; // return the data to use in render
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

    render(state: State, posts: PostType[], followers:number, following:number) {
        const user = state.userProfile;

        this.addEventListeners();

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
                <p><span style="color:white;font-weight:bold;">${followers}</span> Followers</p>
                <p><span style="color:white;font-weight:bold;">${following}</span> Following</p>
                <p><span style="color:white;font-weight:bold;">2</span> Posts</p>
            </div>
        </div>
        <div class="sections">
            <img src="images/stats/your stats.png" alt="Your Statistics" id="your-stats" class="profile-sections">
            <img src="images/stats/your lists.png" alt="Your Lists" id="your-lists" class="profile-sections">
        </div>
        <div class="container">
        </div>
        `
            const container = this.shadowRoot.querySelector('.container');
            posts.forEach(post => {
                const postEl = document.createElement('profile-post') as HTMLElement;
                postEl.setAttribute('id', post.id);
                postEl.setAttribute('title', post.title);
                postEl.setAttribute('artist', post.artist);
                postEl.setAttribute('album', post.album);
                postEl.setAttribute('audio', post.audio);
                postEl.setAttribute('mood', post.mood);
                postEl.setAttribute('caption', post.caption);
                postEl.setAttribute('userId', post.userId);

                container?.appendChild(postEl);
            });
        }
    }

}

export { ProfileRender };