import { FormattedPost } from "../adapters/adaptData";
import { NewMoodj } from "../utils/types/SongTypes";

let listenerAdded = false; 


class RecentPosts extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
    }
    
    connectedCallback() {
        this.render()

        if (!listenerAdded) {
            window.addEventListener('post-created', this.handleNewPost.bind(this));
            listenerAdded = true;
          }
        }
        handleNewPost(event: Event) {
            const { detail } = event as CustomEvent<NewMoodj>;
        
            const { mood, text, song, artist, cover, user } = detail;
        
            const formattedPost: FormattedPost = {
              user: {
                profilePicture: user.profilePicture,
                name: user.name,
                username: user.username,
              },
              song: {
                img: cover,
                mood,
                name: song,
                artistname: artist,
                description: text,
              },
              post: {
                likes: 0,
                comments: 0,
                likedby: '',
              },
              comments: [],
            };
        
            const postCard = document.createElement('post-card') as HTMLElement & { data: FormattedPost };
            postCard.data = formattedPost;
        
            const postFeed = this.shadowRoot?.querySelector('contain-post');
            postFeed?.appendChild(postCard);
          }      
    
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <contain-post>
            </contain-post>

            `
        }
    }
}
export {RecentPosts}