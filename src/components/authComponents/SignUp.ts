import { initializeCarousel } from "../CarouselMoods"
import { registerUser } from "../../services/Firebase/Register/RegisterUserService"
import { loginUser } from "../../services/Firebase/Login/LoginService"
import { NavigationActions } from "../../flux/Actions"

class SignUpComp extends HTMLElement {
  private currentSlideIndex: number = 0
  private slides: HTMLElement[] = []


  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback(){
    this.render()
    if (this.shadowRoot) {
      initializeCarousel(
        this.shadowRoot,
        this.updateCarousel.bind(this),
        this.changeSlide.bind(this),
        (slides) => { this.slides = slides },
        (index) => { this.currentSlideIndex = index }
      )
    }
  }
  
  

  render(): void {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">
                <link rel="stylesheet" href="styles/signUpComp.css">

                <div id="createPost-container">
                    <div id="createPost-info">
                        <h2 class="login-title">Sign up</h2>
                        <p class="welcome-text">Welcome to MOODJ! please create your account</p>
                        <form id="register-form">
                            <label for="username">Username</label>
                            <input type="text" name="username" id="username" placeholder="Enter username">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter email">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter password">
                            <label for="password">Confirm Password</label>
                            <input type="password" name="password" id="confirm-password" placeholder="Enter password">
                            <button type="submit" class="login-btn">Sign up</button>
                            <div class="forgot-row">
                                <a href="#" class="forgot-link" id="login-btn">Already have an account? sign in</a>
                            </div>
                        </form>
                    </div>
                    <div id="createPost-carrousel">
                        <div id="carrousel-container">
                        <span id="prev-btn" class="material-symbols-outlined">keyboard_arrow_left</span>
                        <div class="swiper-container">
                            <div class="swiper-wrapper"></div>
                        </div>
                        <span id="next-btn" class="material-symbols-outlined">keyboard_arrow_right</span>
                        </div>
                        <p id="text-carrousel">Choose your avatar!</p>
                    </div>
                     <div class="forgot-row-mobile">
                                <a href="#" class="forgot-link">Already have an account? sign in</a>
                            </div>

                </div>
    
    ` 

        const forgotLinks = this.shadowRoot.querySelectorAll('.forgot-link');
        forgotLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/login');
          });
        });

        const form = this.shadowRoot!.querySelector<HTMLFormElement>('#register-form')!;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const currentSlide = this.slides[this.currentSlideIndex];
                const mood = currentSlide?.getAttribute('data-mood');
                let profilePic = ''

                if(mood === 'images/moods2/Happy.svg') {
                  profilePic = 'images/pfp/happypfp.svg';
                } else if (mood === 'images/moods2/Angry.svg') {
                  profilePic = 'images/pfp/angrypfp.svg';
                } else if(mood === 'images/moods2/Crying.svg') {
                  profilePic = 'images/pfp/crypfp.svg';
                } else if(mood === 'images/moods2/Love.svg') {
                  profilePic = 'images/pfp/blushpfp.svg';
                } else if(mood === 'images/moods2/Sad.svg') {
                  profilePic = 'images/pfp/sadpfp.svg';
                } else if(mood === 'images/moods2/Serious.svg') {
                  profilePic = 'images/pfp/boredpfp.svg';
                } else if(mood === 'images/moods2/Smily.svg') {
                  profilePic = 'images/pfp/smilypfp.svg';
                } else if(mood === 'images/moods2/Worried.svg') {
                  profilePic = 'images/pfp/worriedpfp.svg';
                } else {
                  profilePic = 'images/pfp/smilypfp.svg';
                }
                
                const data = {
                username: formData.get('username') as string,
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                pfp: profilePic,
                password: formData.get('password') as string,
                }

                if (data.password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            registerUser(data.email, data.password, data.username, data.pfp)
                .then((response) => {
                    if (!response.isRegistered) {
                        console.error('Error al registrar el usuario:', response.error);
                        alert('Error al registrar el usuario. Por favor, verifica tus datos.');
                        return;
                    }
                    alert('Usuario registrado exitosamente.');
                    loginUser(data.email, data.password);
                    NavigationActions.navigate('/home');
                })
                .catch((error) => {
                    console.error('Error al registrar el usuario:', error);
                    alert('Ocurrió un error. Por favor, intenta nuevamente.');
                });

            });
  }

  updateCarousel(skipTransition: boolean = false) {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.currentSlideIndex
      slide.style.transition = skipTransition ? "none" : "transform 0.4s ease, opacity 0.4s ease"
      slide.style.transform = `translateX(${(index - this.currentSlideIndex) * 100}%) scale(${isActive ? 1 : 0.85})`
      slide.style.opacity = isActive ? "1" : "0.3"
      slide.style.zIndex = isActive ? "2" : "1"
    })
  }

  changeSlide(direction: number) {
    const totalSlides = this.slides.length
    const realCount = totalSlides - 2
    this.currentSlideIndex += direction
    this.updateCarousel()

    setTimeout(() => {
      if (this.currentSlideIndex === 0) {
        this.currentSlideIndex = realCount
        this.updateCarousel(true)
      } else if (this.currentSlideIndex === totalSlides - 1) {
        this.currentSlideIndex = 1
        this.updateCarousel(true)
      }
    }, 400)
  }
    
}

export {SignUpComp}