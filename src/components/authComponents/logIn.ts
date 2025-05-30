import { loginUser } from "../../services/Firebase/Login/LoginService";
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

        if (this.shadowRoot) {

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
                        <form id="login-form">
                            <label for="username">Email</label>
                            <input type="text" id="email" name="email" placeholder="Enter email">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter password">
                            <button type="submit" class="login-btn">Log in</button>
                        </form>
                        <div class="signup-row">
                            <span>New user? </span><a href="#" class="signup-link">sign up</a>
                        </div>
                    </div>
                </div>

                <div class="bottom-container"> 

                    <div class="circle-container-mobile">
                            <img class="yellow-circle-mobile" src="/images/moods2/happy-yellow-circle.svg" alt="">
                            <img class="red-circle-mobile" src="/images/moods2/happy-red-circle.svg" alt="">
                        </div>

                </div>

  </div>
                        
            `;

            const form = this.shadowRoot!.querySelector<HTMLFormElement>('#login-form')!;
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const email = formData.get('email') as string;
                    const password = formData.get('password') as string;

                    const result = await loginUser(email, password);

                    if (result.isLoggedIn) {
                        NavigationActions.navigate('/home');
                    } else {
                        console.error('Login failed:', result.error);
                    }
                });


                const signUp = this.shadowRoot!.querySelector('#signup');
                signUp?.addEventListener('click', () => {
                    const path = signUp.getAttribute('navigate-to');
                    if (path) {
                        NavigationActions.navigate('/signup')
                    }
                });
            }
        }
    }
}

export {LogInComp};


