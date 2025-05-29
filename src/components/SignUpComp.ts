import { initializeCarousel } from "./carrousel"

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
                        <form>
                            <label for="username">Username</label>
                            <input type="text" id="username" placeholder="Enter username">
                            <label for="password">Email</label>
                            <input type="text" id="email" placeholder="Enter email">
                            <label for="username">Password</label>
                            <input type="password" id="password" placeholder="Enter password">
                            <label for="password">Confirm Password</label>
                            <input type="password" id="confirm-password" placeholder="Enter password">
                            <button type="submit" class="login-btn">Sign up</button>
                            <div class="forgot-row">
                                <a href="#" class="forgot-link">Already have an account? sign in</a>
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

                    <button type="submit" class="login-btn-mobile">Sign up</button>
                            <div class="forgot-row-mobile">
                                <a href="#" class="forgot-link">Already have an account? sign in</a>
                            </div>

                </div>
    
    ` 
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