interface User {
  name: string;
  username: string;
  avatar: string;
}

class UserCarousel extends HTMLElement {
  private users: User[] = [];
  private currentIndex: number = 0;
  private slideWidth: number = 0;
  private slidesPerView: number = 3;
  private wrapper: HTMLElement | null = null;
  private isDragging: boolean = false;
  private startPos: number = 0;
  private currentTranslate: number = 0;
  private prevTranslate: number = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Bind methods to ensure 'this' refers to the class instance
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    this.loadUsers();
    this.render();
    
    // Wait for DOM to be ready
    setTimeout(() => {
      this.setupCarousel();
    }, 0);
    
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
  }

  loadUsers() {
    if (this.users.length === 0) {
      this.users = [
        { name: "Eli", username: "@elipinipon", avatar: "icons/Pfp1.svg" },
        { name: "Santiago", username: "@santiti", avatar: "icons/Pfp2.svg" },
        { name: "Luis F", username: "@terricola", avatar: "icons/Pfp3.svg" },
        { name: "Leider", username: "@leiderr.js", avatar: "icons/Pfp4.svg" },
        { name: "Isa", username: "@itsabella", avatar: "icons/Pfp5.svg" },
        { name: "Terry", username: "@not.terrypriv", avatar: "icons/Pfp6.svg" },
  
      ];
    }
  }

  setUsers(usersArray: User[]) {
    this.users = usersArray;
    this.render();
    setTimeout(() => {
      this.setupCarousel();
    }, 0);
  }

  handleResize() {
    this.updateSlidesPerView();
    this.updateSlideWidth();
    this.goToSlide(this.currentIndex);
  }

  updateSlidesPerView() {
    const width = window.innerWidth;
    if (width < 480) {
      this.slidesPerView = 1;
    } else if (width < 768) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }
  }

  updateSlideWidth() {
    if (!this.shadowRoot) return;
    
    const carousel = this.shadowRoot.querySelector('.carousel');
    if (!carousel) return;
    
    const containerWidth = carousel.clientWidth;
    this.slideWidth = containerWidth / this.slidesPerView;
    
    const slides = this.shadowRoot.querySelectorAll('.carousel-slide');
    slides.forEach((slide: Element) => {
      (slide as HTMLElement).style.width = `${this.slideWidth}px`;
    });
  }

  setupCarousel() {
    if (!this.shadowRoot) return;
    
    this.updateSlidesPerView();
    this.wrapper = this.shadowRoot.querySelector('.carousel-wrapper');
    this.updateSlideWidth();
    
    // Add event listeners
    const prevButton = this.shadowRoot.querySelector('.carousel-prev');
    const nextButton = this.shadowRoot.querySelector('.carousel-next');
    
    if (prevButton) {
      prevButton.addEventListener('click', this.prevSlide);
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', this.nextSlide);
    }
    
    // Set initial position
    this.goToSlide(0);
    
    console.log('Carousel setup complete');
  }

  prevSlide() {
    console.log('Previous slide clicked');
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Loop to the end
      this.currentIndex = Math.max(0, this.users.length - this.slidesPerView);
    }
    this.goToSlide(this.currentIndex);
  }

  nextSlide() {
    console.log('Next slide clicked');
    if (this.currentIndex < this.users.length - this.slidesPerView) {
      this.currentIndex++;
    } else {
      // Loop to the beginning
      this.currentIndex = 0;
    }
    this.goToSlide(this.currentIndex);
  }

  goToSlide(index: number) {
    if (!this.wrapper) return;
    
    this.currentIndex = index;
    const translateX = -index * this.slideWidth;
    
    console.log(`Going to slide ${index}, translateX: ${translateX}px`);
    
    this.wrapper.style.transition = 'transform 0.3s ease-out';
    this.wrapper.style.transform = `translateX(${translateX}px)`;
    
    this.currentTranslate = translateX;
    this.prevTranslate = translateX;
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        /* Base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* Host element styles */
        :host {
            display: block;
            width: 100%;
            font-family: "Inter", sans-serif;
        }
        
        /* Carousel container */
        .carousel-container {
            background-color: #1E1E1E;
            border-radius: 20px;
            padding: 25px;
            border: 3px solid #4361EE;
            box-shadow: 0 4px 20px rgba(67, 97, 238, 0.15);
            color: white;
            width: 800px;
            height: 300px;
            margin: auto;
            justify-self: center;
            align-self: center;
            position: relative;
            display: block;
        }
        
        h2 {
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: 600;
        }
        
        /* Main carousel element */
        .carousel {
            height: 220px;
            position: relative;
            overflow: hidden;
        }
        
        /* Wrapper for slides */
        .carousel-wrapper {
            display: flex;
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        /* Individual slide */
        .carousel-slide {
            flex-shrink: 0;
            height: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            padding: 0 15px;
        }
        
        /* Navigation buttons */
        .carousel-prev,
        .carousel-next {
            position: absolute;
            top: 45%;
            width: 40px;
            height: 40px;
            margin-top: -20px;
            z-index: 10;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
        
        .carousel-prev {
            left: -6px;
        }
        
        .carousel-next {
            right: -6px;
        }
        
        /* User card styles */
        .carousel-card {
            width: 220px;
            height: 174px;
            background-color: #4361EE;
            border-radius: 15px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .avatar {
            width: 72px;
            height: 72px;                      
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
            border-radius: 50%;
        }
        
        .avatar img {
            width: 50px;
            height: 50px;
        }
        
        .user-details {
            margin-left: 8px;
        }
        
        .user-details h3 {
            font-size: 24px;
            margin-bottom: 2px;
            color: white;
        }
        
        .username {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .follow-btn {
            background-color: #1E1E1E;
            color: white;
            border: none;
            border-radius: 11px;
            padding: 8px 0;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            width: 140px;
            height: 39px;
            align-self: center;
            margin-bottom: 10px;
            transition: background-color 0.3s ease;
        }
        
        .follow-btn:hover {
            background-color: #333;
        }
        
        /* Responsive styles */
        @media (max-width: 840px) {
            .carousel-container {
                width: 90%;
            }
        }
        
        @media (max-width: 768px) {
            .carousel-container {
                padding: 20px;
            }
        }
        
        @media (max-width: 480px) {
            .carousel-prev,
            .carousel-next {
                width: 30px;
                height: 30px;
                font-size: 18px;
            }
        }
      </style>
      
      <div class="carousel-container">
        <h2>You may know...</h2>
        
        <div class="carousel">
          <div class="carousel-wrapper">
            ${this.users.map((user) => `
              <div class="carousel-slide">
                <user-card 
                  name="${user.name}" 
                  username="${user.username}" 
                  avatar="${user.avatar}">
                </user-card>
              </div>
            `).join('')}
          </div>
          
          <img class="carousel-prev" src="/icons/Left-arrow.svg" alt="Prev">
          <img class="carousel-next" src="/icons/Right-arrow.svg" alt="Next">
          
        </div>
      </div>
    `;
  }
}

export { UserCarousel };