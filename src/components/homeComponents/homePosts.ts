import { dataToPost } from "../../adapters/adaptData"
import { FormattedPost } from "../../adapters/adaptData";
import { fetchPosts } from "../../services/Firebase/GetPostsService";
import { GetDataActions } from "../../flux/Actions";
import { store, State } from "../../flux/Store";
import { getData } from "../../services/getMock"

class HomePosts extends HTMLElement{
    postsData: FormattedPost[] = [];
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
        const response = await getData()
        this.postsData = dataToPost(response);
        this.render()
    }

    async loadPosts() {
    const data = await fetchPosts();// Firebase call! 
    GetDataActions.getPosts(data); //Flux dispatch to store data
  }

    render(state = store.getState()) {
      const posts = state.posts;
      console.log(posts)
        if (this.shadowRoot !== null) {
        
        this.shadowRoot.innerHTML = `
        <style>
        </style>
        <div class="post-container">
        </div>
        `
        const container = this.shadowRoot?.querySelector('.post-container');
        this.postsData.forEach(post => {
          const postCard = document.createElement('post-card') as HTMLElement & { data: FormattedPost };
          postCard.data = post;
          container?.appendChild(postCard);
        });
        

    }
    }

}

export {HomePosts};