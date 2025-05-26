import { fetchPosts } from "../../services/Firebase/Posts/GetPostsService";
import { GetDataActions } from "../../flux/Actions";
import { store, State } from "../../flux/Store";

class HomePosts extends HTMLElement{
    constructor() {
        super();
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({mode: "open"})
    }
    
    handleChange(state: State) {
        this.render(state);
    }

    async connectedCallback() {
        await this.loadPosts();
        this.render()
    }

    async loadPosts() {
    const data = await fetchPosts();// Firebase call! 
    GetDataActions.getPosts(data); //Flux dispatch to store data
    }  

    render(state = store.getState()) {
      const posts = state.posts;
        if (this.shadowRoot !== null) {
        
        this.shadowRoot.innerHTML = `
        <style>
        </style>
        <div class="post-container">
        </div>
        `
        const container = this.shadowRoot?.querySelector('.post-container');

        posts.forEach(post => {
          const postEl = document.createElement('post-card') as HTMLElement;
          postEl.setAttribute('id', post.id);
          postEl.setAttribute('title', post.title);
          postEl.setAttribute('artist', post.artist);
          postEl.setAttribute('album', post.album);
          postEl.setAttribute('audio', post.audio);
          postEl.setAttribute('mood', post.mood);
          postEl.setAttribute('caption', post.caption);
          postEl.setAttribute('userId', post.userId);

          container?.appendChild(postEl);
        })
    }
    }

}

export {HomePosts};