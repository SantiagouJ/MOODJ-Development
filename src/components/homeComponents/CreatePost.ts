import { initializeCarousel } from "../CarouselMoods";
import { setupSearch } from "../../utils/musicAPI/musicSearch"
import { Song } from "../../utils/types/SongTypes"
import { createPost } from "../../services/Firebase/Posts/NewPostService";

class CreatePost extends HTMLElement {
  private selectedSong: Song | null = null;
  private currentSlideIndex: number = 0
  private slides: HTMLElement[] = []
  private currentAudio: HTMLAudioElement | null = null


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
      setupSearch(this.shadowRoot, this.renderSelectedSong.bind(this))
      const postBtn = this.shadowRoot.querySelector('#btn1')
      postBtn?.addEventListener('click', () => {
        this.createPost();
      })
    }

  }
  createPost() {
    if (!this.shadowRoot) return;
    const userId = this.getAttribute('user-id');
    if(!userId) return;
  
    const input = this.shadowRoot.querySelector('#input2') as HTMLInputElement;
    const text = input?.value.trim();

    if (text.length > 120) {
      alert("Input limit is 120 characters.");
      return;
    }
    
    if (!this.selectedSong) {
      alert("Please select a song before posting.");
      return;
    }
  
    if (!text) {
      alert("Please write something in the input before posting.");
      return;
    }
    const currentSlide = this.slides[this.currentSlideIndex];
    const mood = currentSlide?.getAttribute('data-mood') || '/photos/Smily.svg';

    //Call CreatePost which is a firebase function that also calls the dispatcher using flux...
    createPost(
      {
          title: this.selectedSong.title,
          artist: this.selectedSong.artist.name,
          album: this.selectedSong.album.cover_xl,
          audio: this.selectedSong.preview,
          mood: mood,
          caption: text,
          userId: userId,
      }
    )
    const text2 = this.shadowRoot.querySelector("#text2") as HTMLParagraphElement
    const text3 = this.shadowRoot.querySelector("#text3") as HTMLParagraphElement
    const musicImgDiv = this.shadowRoot.querySelector("#music-img") as HTMLDivElement
    input.value = "";
    text2.textContent = 'Your mood in a song';
    text3.textContent = 'By your favorite artists';
    musicImgDiv.innerHTML = `<span class="material-symbols-outlined">headphones</span>`;
    this.currentAudio = null;

  }
  

  render(): void {
    if (!this.shadowRoot) return
      
    const userName = this.getAttribute('username');
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">
                <link rel="stylesheet" href="styles/create_post.css">

                <div id="createPost-container">
                    <div id="createPost-info">
                        <h1>Hello ${userName}!</h1>
                        <p id="text1">How are you feeling today?</p>

                        <div id="music-container">
                            <div id="search">
                                <span class="material-symbols-outlined">search</span>
                                <input id="input1" type="text" placeholder="Search music...">
                                <div id="search-results" class="hidden"></div>
                            </div>

                            <div id="music-render">
                                <div id="music-img">
                                    <span class="material-symbols-outlined">headphones</span>
                                </div>
                                <div id="music-text">
                                    <p id="text2">Your mood in a song</p>
                                    <p id="text3">By your favorite artists</p>
                                </div>
                            </div>
                        </div>

                        <input id="input2" type="text" placeholder="Share your thoughts...">
                        <button id="btn1">Post mood</button>
                    </div>
                    <div id="createPost-carrousel">
                        <span id="prev-btn" class="material-symbols-outlined">keyboard_arrow_left</span>
                        <div class="swiper-container">
                            <div class="swiper-wrapper"></div>
                        </div>
                        <span id="next-btn" class="material-symbols-outlined">keyboard_arrow_right</span>
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

  renderSelectedSong(song: Song) {
    if (!this.shadowRoot) return
    
  
    const text2 = this.shadowRoot.querySelector("#text2") as HTMLParagraphElement
    const text3 = this.shadowRoot.querySelector("#text3") as HTMLParagraphElement
    const musicImgDiv = this.shadowRoot.querySelector("#music-img") as HTMLDivElement
    const searchResultsDiv = this.shadowRoot.querySelector("#search-results") as HTMLDivElement
  
    text2.textContent = song.title
    text3.textContent = `By ${song.artist.name}`
    musicImgDiv.innerHTML = `<img src="${song.album.cover_xl}" alt="${song.title} Cover">`
  
    searchResultsDiv.classList.add("hidden")
    searchResultsDiv.innerHTML = ""
    this.selectedSong = song;

    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio = null
    }
  
    this.currentAudio = new Audio(song.preview)
  
    musicImgDiv.onclick = () => {
      if (!this.currentAudio) return
  
      if (this.currentAudio.paused) {
        this.currentAudio.play()
      } else {
        this.currentAudio.pause()
      }
    }
  }
  
  
}

customElements.define("create-post", CreatePost)
export {CreatePost}