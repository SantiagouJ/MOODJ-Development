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
    private touchStartX: number = 0;
    private touchEndX: number = 0;
    private wrapper: HTMLElement | null = null;
    private isDragging: boolean = false;
    private startPos: number = 0;
    private currentTranslate: number = 0;
    private prevTranslate: number = 0;
    private animationID: number = 0;
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.handleResize = this.handleResize.bind(this);
      this.nextSlide = this.nextSlide.bind(this);
      this.prevSlide = this.prevSlide.bind(this);
    }
  
    connectedCallback() {
      this.loadUsers();
      this.render();
      this.setupCarousel();
      window.addEventListener('resize', this.handleResize);
    }
  
    disconnectedCallback() {
      window.removeEventListener('resize', this.handleResize);
      this.removeEventListeners();
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue !== newValue) {
        (this as any)[name] = newValue;
        this.render();
        this.setupCarousel();
      }
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
      this.setupCarousel();
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
      this.addEventListeners();
    }
  
    addEventListeners() {
      if (!this.shadowRoot) return;
      
      const prevButton = this.shadowRoot.querySelector('.carousel-prev');
      const nextButton = this.shadowRoot.querySelector('.carousel-next');
      
      if (prevButton) {
        prevButton.addEventListener('click', this.prevSlide);
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', this.nextSlide);
      }
      
      this.addTouchEvents();
    }
  
    removeEventListeners() {
      if (!this.shadowRoot) return;
      
      const prevButton = this.shadowRoot.querySelector('.carousel-prev');
      const nextButton = this.shadowRoot.querySelector('.carousel-next');
      
      if (prevButton) {
        prevButton.removeEventListener('click', this.prevSlide);
      }
      
      if (nextButton) {
        nextButton.removeEventListener('click', this.nextSlide);
      }
      
      this.removeTouchEvents();
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
  
    removeTouchEvents() {
      if (!this.wrapper) return;
      
      this.wrapper.removeEventListener('touchstart', this.touchStart.bind(this));
      this.wrapper.removeEventListener('touchmove', this.touchMove.bind(this));
      this.wrapper.removeEventListener('touchend', this.touchEnd.bind(this));
      
      this.wrapper.removeEventListener('mousedown', this.touchStart.bind(this));
      this.wrapper.removeEventListener('mousemove', this.touchMove.bind(this));
      this.wrapper.removeEventListener('mouseup', this.touchEnd.bind(this));
      this.wrapper.removeEventListener('mouseleave', this.touchEnd.bind(this));
    }
  
    touchStart(event: TouchEvent | MouseEvent) {
      this.isDragging = true;
      this.startPos = this.getPositionX(event);
      this.animationID = requestAnimationFrame(this.animation.bind(this));
      
      if (this.wrapper) {
        this.wrapper.classList.add('dragging');
      }
    }
  
    touchMove(event: TouchEvent | MouseEvent) {
      if (!this.isDragging) return;
      
      const currentPosition = this.getPositionX(event);
      this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
      
      // Prevent default to stop scrolling when dragging
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  
    touchEnd() {
      this.isDragging = false;
      cancelAnimationFrame(this.animationID);
      
      const movedBy = this.currentTranslate - this.prevTranslate;
      
      // Determine if slide should advance
      if (movedBy < -100 && this.currentIndex < this.users.length - this.slidesPerView) {
        this.currentIndex += 1;
      }
      
      if (movedBy > 100 && this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
      
      this.goToSlide(this.currentIndex);
      
      if (this.wrapper) {
        this.wrapper.classList.remove('dragging');
      }
    }
  
    animation() {
      this.setSliderPosition();
      if (this.isDragging) {
        requestAnimationFrame(this.animation.bind(this));
      }
    }
  
    getPositionX(event: TouchEvent | MouseEvent): number {
      return event instanceof TouchEvent 
        ? event.touches[0].clientX 
        : (event as MouseEvent).clientX;
    }
  
    setSliderPosition() {
      if (this.wrapper) {
        this.wrapper.style.transform = `translateX(${this.currentTranslate}px)`;
      }
    }
  
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.goToSlide(this.currentIndex);
      } else {
        // Loop to the end
        this.currentIndex = Math.max(0, this.users.length - this.slidesPerView);
        this.goToSlide(this.currentIndex);
      }
    }
  
    nextSlide() {
      if (this.currentIndex < this.users.length - this.slidesPerView) {
        this.currentIndex++;
        this.goToSlide(this.currentIndex);
      } else {
        // Loop to the beginning
        this.currentIndex = 0;
        this.goToSlide(this.currentIndex);
      }
    }
  
    goToSlide(index: number) {
      if (!this.wrapper) return;
      
      this.currentIndex = index;
      this.currentTranslate = -index * this.slideWidth;
      this.prevTranslate = this.currentTranslate;
      
      this.wrapper.style.transition = 'transform 0.5s ease-out';
      this.wrapper.style.transform = `translateX(${this.currentTranslate}px)`;
      
      // Remove transition after animation completes
      setTimeout(() => {
        if (this.wrapper) {
          this.wrapper.style.transition = '';
        }
      }, 500);
    }
  
    render() {
      if (!this.shadowRoot) return;
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/moodCarousel.css">
        
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
            
            <button class="carousel-prev">←</button>
            <button class="carousel-next">→</button>
          </div>
        </div>
      `;
  
      // Setup carousel after rendering
      requestAnimationFrame(() => {
        this.setupCarousel();
      });
    }
  }
  
  export { UserCarousel };