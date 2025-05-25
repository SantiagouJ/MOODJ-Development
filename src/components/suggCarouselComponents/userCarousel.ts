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
  private resizeObserver: ResizeObserver | null = null;

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
    
    // Force layout recalculation
    
    // Setup carousel with a slight delay to ensure DOM is ready
    setTimeout(() => {
      this.setupCarousel();
      
      // Force visibility
      if (this.shadowRoot) {
        const container = this.shadowRoot.querySelector('.carousel-container');
        if (container) {
          (container as HTMLElement).style.visibility = 'visible';
          (container as HTMLElement).style.opacity = '1';
        }
      }
    }, 50);
    
    // Setup resize observer for more reliable size updates
    this.setupResizeObserver();
    
    window.addEventListener('resize', this.handleResize);
    
    // Add load event listener to window to ensure all resources are loaded
    window.addEventListener('load', () => {
      this.updateSlideWidth();
      this.goToSlide(this.currentIndex);
    });
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  setupResizeObserver() {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target === this) {
            this.handleResize();
          }
        }
      });
      this.resizeObserver.observe(this);
    }
  }

  loadUsers() {
    if (this.users.length === 0) {
      this.users = [
        { name: "Eli", username: "@elipinipon", avatar: "/images/moods2/Love.svg" },
        { name: "Santiago", username: "@santiti", avatar: "/images/moods2/Love.svg" },
        { name: "Luis F", username: "@terricola", avatar: "/images/moods2/Worried.svg" },
        { name: "Leider", username: "@leiderr.js", avatar: "/images/moods2/Angry.svg" },
        { name: "Isa", username: "@itsabella", avatar: "/images/moods2/Happy.svg" },
        { name: "Terry", username: "@not.terrypriv", avatar: "/images/moods2/Sad.svg" },
      ];
    }
  }

  setUsers(usersArray: User[]) {
    this.users = usersArray;
    this.render();
    setTimeout(() => {
      this.setupCarousel();
    }, 50);
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
    
    // Add touch events
    this.addTouchEvents();
    
    // Set initial position
    this.goToSlide(0);
    
  }

  addTouchEvents() {
    if (!this.wrapper) return;
    
    this.wrapper.addEventListener('touchstart', this.touchStart.bind(this), { passive: true });
    this.wrapper.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
    this.wrapper.addEventListener('touchend', this.touchEnd.bind(this), { passive: true });
    
    // Mouse events for desktop
    this.wrapper.addEventListener('mousedown', this.touchStart.bind(this));
    this.wrapper.addEventListener('mousemove', this.touchMove.bind(this));
    this.wrapper.addEventListener('mouseup', this.touchEnd.bind(this));
    this.wrapper.addEventListener('mouseleave', this.touchEnd.bind(this));
  }

  touchStart(event: TouchEvent | MouseEvent) {
    this.isDragging = true;
    this.startPos = this.getPositionX(event);
    
    if (this.wrapper) {
      this.wrapper.classList.add('dragging');
    }
  }

  touchMove(event: TouchEvent | MouseEvent) {
    if (!this.isDragging) return;
    
    const currentPosition = this.getPositionX(event);
    this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
    
    if (this.wrapper) {
      this.wrapper.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    
    // Prevent default to stop scrolling when dragging
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  touchEnd() {
    this.isDragging = false;
    
    const movedBy = this.currentTranslate - this.prevTranslate;
    
    // Determine if slide should advance
    if (movedBy < -100 && this.currentIndex < this.users.length - this.slidesPerView) {
      this.currentIndex += 1;
    } else if (movedBy > 100 && this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
    
    this.goToSlide(this.currentIndex);
    
    if (this.wrapper) {
      this.wrapper.classList.remove('dragging');
    }
  }

  getPositionX(event: TouchEvent | MouseEvent): number {
    return event instanceof TouchEvent 
      ? event.touches[0].clientX 
      : (event as MouseEvent).clientX;
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Loop to the end
      this.currentIndex = Math.max(0, this.users.length - this.slidesPerView);
    }
    this.goToSlide(this.currentIndex);
  }

  nextSlide() {
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
    
    
    this.wrapper.style.transition = 'transform 0.3s ease-out';
    this.wrapper.style.transform = `translateX(${translateX}px)`;
    
    this.currentTranslate = translateX;
    this.prevTranslate = translateX;
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/styles/moodCarousel.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">
      <div class="carousel-container" style="visibility: hidden; opacity: 0; transition: opacity 0.3s ease;">
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
          
<span id="prev-btn" class="carousel-prev material-symbols-outlined">keyboard_arrow_left</span>          
<span id="next-btn" class="carousel-next material-symbols-outlined">keyboard_arrow_right</span>
        </div>
      </div>
    `;
  }
}

export { UserCarousel };