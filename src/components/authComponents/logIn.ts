import { NavigationActions } from "../../flux/Actions";
class LogInComp extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        if (!this.shadowRoot) return;

        const signUpLink = this.shadowRoot.querySelector('.signup-link');
        signUpLink?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            NavigationActions.navigate('/signup');
        });
    }

    render() {

        if (this.shadowRoot){

        this.shadowRoot.innerHTML = `


            <link rel="stylesheet" href="./styles/logIn.css">
            
            <div class="container">
                <div class="left-side">
                    <div class="circle-container">
                        <img class="yellow-circle" src="/images/moods2/happy-yellow-circle.svg" alt="">
                        <img class="red-circle" src="/images/moods2/happy-red-circle.svg" alt="">
                    </div>
                    <h1 class="greeting">Welcome<br>back!</h1>
                </div>
                <div class="card">
                    <div class="text-elements">
                        <h2 class="login-title">Login</h2>
                        <p class="welcome-text">Welcome back! Please log in to<br>your MOODJ account</p>
                    </div>
                    <div class="form-elements">
                        <form>
                            <label for="username">Username</label>
                            <input type="text" id="username" placeholder="Enter username">
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Enter password">
                            <div class="forgot-row">
                                <a href="#" class="forgot-link">Forgot password?</a>
                            </div>
                            <button type="submit" class="login-btn">Log in</button>
                        </form>
                        <div class="signup-row">
                            <span>New user? </span><a href="#" class="signup-link">sign up</a>
                        </div>
                    </div>
                </div>
            </div>
                        
            `;

        }
    }
}

export {LogInComp};


