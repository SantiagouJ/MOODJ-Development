import { NavigationActions } from "../../../flux/Actions";
import { fetchUserLists } from "../../../services/Firebase/Lists/GetUserListsService";
import { PostType } from "../../../utils/types/PostType";
import { fetchPostsByIds } from "../../../services/Firebase/Posts/GetPostsByIdsService";
import { store } from "../../../flux/Store";

class UserLists extends HTMLElement{
    private savedPosts: PostType[] = [];

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    
    async connectedCallback() {
        await this.loadSavedPosts();
        this.render()
        this.addEventListeners()
    }

    async loadSavedPosts() {
        const state = store.getState();
        const loggedUser = state.userProfile;
        if (!loggedUser) return;

        try {
            // Obtener todas las listas del usuario
            const lists = await fetchUserLists(loggedUser.id);
            
            // Extraer todos los IDs de posts de todas las listas
            const allPostIds: string[] = [];
            lists.forEach(list => {
                allPostIds.push(...list.posts);
            });
            
            // Remover duplicados
            const uniquePostIds = [...new Set(allPostIds)];
            
            // Obtener los posts completos
            this.savedPosts = await fetchPostsByIds(uniquePostIds);
        } catch (error) {
            console.error('Error loading saved posts:', error);
            this.savedPosts = [];
        }
    }

    addEventListeners() {
        if (!this.shadowRoot) return;
        const prevBtn = this.shadowRoot.querySelector('#prev-btn');
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/profile');
        });
    }


    render(){ 
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `
                <link rel="stylesheet" href="styles/profileComponents/profileView.css">
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

                <style>
                    #prev-btn {
                        font-size: 40px;
                    }
                    .empty-posts {
                        text-align: center;
                        padding: 2rem;
                        color: #666;
                    }
                    .saved-posts-header {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1rem;
                        margin-top: 50px;
                        margin-bottom: 1rem;
                    }
                    .saved-posts-title {
                        color: white;
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 0;
                    }
                    .posts-container {
                        padding: 0 1rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                    }
                </style>

                <div class="saved-posts-header">
                    <span id="prev-btn" class="carousel-prev material-symbols-outlined" style="cursor: pointer; color: white;">keyboard_arrow_left</span>          
                    <h1 class="saved-posts-title">My Lists</h1>
                </div>
                
                <div class="posts-container">
                    ${this.savedPosts.length === 0 ? `
                        <div class="empty-posts">
                            <p>You don't have any lists yet.</p>
                            <p>Save your first list to start saving posts!</p>
                        </div>
                    ` : ''}
                </div>
            `;

            // Agregar los posts usando profile-post como en ProfileRender
            const container = this.shadowRoot.querySelector('.posts-container');
            this.savedPosts.forEach(post => {
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

export {UserLists}