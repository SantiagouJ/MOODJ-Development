import { dataToPost } from "../../adapters/adaptData"
import { FormattedPost } from "../../adapters/adaptData";
import { getData } from "../../services/getMock"
class HomePosts extends HTMLElement{
    postsData: FormattedPost[] = [];
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        const response = await getData()
        this.postsData = dataToPost(response);
        this.render()
    }
    render() {
        if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
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