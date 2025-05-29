import { store } from "../../flux/Store";
import { State } from "../../flux/Store";
import { UserActions } from "../../flux/Actions";
import { updateUserName } from "../../services/Firebase/Profile/UpdateUsernameService";

class EditProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
     store.subscribe(async (state: State) => {
        this.render(state);
    });
  }

  render(state: State) {
    if (this.shadowRoot) {
        const userId = state.userProfile?.id;
        if(!userId) return;
      this.shadowRoot.innerHTML = `
                                
                <link rel="stylesheet" href="styles/profileComponents/editProfile.css">

                <div class="overlay">
                <div class="edit-box">
                    <h1>Edit profile</h1>
                    <p>Name</p>
                    <input class="input-box" id="name-input"></input>
                    <button class="edit-btn" id="submit-btn">Update</button>
                </div> 
                </div>
                            `;
    const overlay = this.shadowRoot?.querySelector('.overlay') as HTMLElement;
    overlay?.addEventListener('click', (e: MouseEvent) => {
      if (e.target === overlay) this.remove(); // Close on background click
    });

    const submitBtn = this.shadowRoot.getElementById('submit-btn'); 
    const nameInput = this.shadowRoot.getElementById('name-input') as HTMLInputElement;
        submitBtn?.addEventListener('click', async () => {
        if(!nameInput) return;
        const newName = nameInput.value.trim();

        if (!newName) {
            alert('Name cannot be empty');
            return;
        }

        try {
            await updateUserName(userId, newName);
            UserActions.updateName(newName)
            alert('Name updated successfully!');
        } catch (error) {
            console.error('Error updating name:', error);
            alert('Failed to update name');
        }
        });
    }
  }
}

export { EditProfile };
