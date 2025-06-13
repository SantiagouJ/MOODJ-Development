import { isFollowing } from "../../services/Firebase/Follow/FollowUserService";
import { store } from "../../flux/Store";
import { State } from "../../flux/Store";
import { unfollowUser } from "../../services/Firebase/Follow/FollowUserService";
import { followUser } from "../../services/Firebase/Follow/FollowUserService";

class UserCard extends HTMLElement {

    name: string = "";
    username: string = "";
    avatar: string = "";
    id: string = "";
  
  
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
    }
  
    static get observedAttributes() {
      return ["name", "username", "avatar", "id"]
    }
  
    connectedCallback() {
      store.subscribe((state: State) => {
        this.render(state);
        this.addEventListeners(state)

      });
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue === newValue) return;
      
      switch (name) {
        case 'name':
          this.name = newValue;
          break;
        case 'username':
          this.username = newValue;
          break;
        case 'avatar':
          this.avatar = newValue;
          break;
        case 'id':
          this.id = newValue
          break;
      }
      
    }
  
    addEventListeners(state:State) {
      if (this.shadowRoot) {
        const loggedUser = state.userProfile;
        if(!loggedUser || !this.id) return;
        const followBtn = this.shadowRoot.querySelector(".follow-btn");
        if (followBtn) {
                // call firebase to toggle follow or unfollow..
                followBtn.addEventListener("click", async () => {
                  const following = await isFollowing(loggedUser.id, this.id);
                  if (loggedUser.id != this.id) {
                    try {
                      if (following) {
                        await unfollowUser(loggedUser.id, this.id);
                        followBtn.textContent = "Follow";
                      } else {
                        await followUser(loggedUser.id, this.id);
                        followBtn.textContent = "Following";
                      }
                    } catch (e) {
                      console.error("Follow/unfollow failed:", e);
                    }
                  }
                });
        }

      }
  
  
    }
  
    render(state:State) {
      const loggedUser = state.userProfile;
      if (this.shadowRoot) {
  
        this.shadowRoot.innerHTML = `
                
          <link rel="stylesheet" href="/styles/moodCarousel.css">
  
              <div class="carousel-card">
                  <div class="user-info">
                      <div class="avatar">
                          <img src="${this.avatar}" alt="${this.name}">
                      </div>
                      <div class="user-details">
                          <h3>${this.name}</h3>
                          <span class="username">${this.username}</span>
                      </div>
                  </div>
                  <button class="follow-btn">Follow</button>
              </div>
          `
        const followBtn = this.shadowRoot.querySelector(".follow-btn");

        if (followBtn) {
        if(!loggedUser || !this.id) return;

        isFollowing(loggedUser.id, this.id).then((alreadyFollowing) => {
          followBtn.textContent = alreadyFollowing ? "Following" : "Follow";
        });
      }
  
    }
  }
}
  export { UserCard }
  