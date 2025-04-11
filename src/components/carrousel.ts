export function initializeCarousel(
    shadowRoot: ShadowRoot,
    updateCarousel: (skipTransition?: boolean) => void,
    changeSlide: (direction: number) => void,
    setSlides: (slides: HTMLElement[]) => void,
    setCurrentSlideIndex: (index: number) => void
  ): void {
    const swiperWrapper = shadowRoot.querySelector(".swiper-wrapper") as HTMLElement
    const prevBtn = shadowRoot.querySelector("#prev-btn") as HTMLElement
    const nextBtn = shadowRoot.querySelector("#next-btn") as HTMLElement
  
    const slidesData: string[] = [
      "photos/moods/Happy.svg",
      "photos/moods/Angry.svg",
      "photos/moods/Crying.svg",
      "photos/moods/Love.svg",
      "photos/moods/Sad.svg",
      "photos/moods/Serious.svg",
      "photos/moods/Smily.svg",
      "photos/moods/Worried.svg"
    ]
  
    const realSlides = slidesData.map((src, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.setAttribute("data-mood", src);
      slide.innerHTML = `<img src="${src}" alt="Mood ${index + 1}">`;
      return slide;
    });
    
  
    const firstClone = realSlides[0].cloneNode(true) as HTMLElement
    const lastClone = realSlides[realSlides.length - 1].cloneNode(true) as HTMLElement
  
    swiperWrapper.appendChild(lastClone)
    realSlides.forEach(slide => swiperWrapper.appendChild(slide))
    swiperWrapper.appendChild(firstClone)
  
    const allSlides = [lastClone, ...realSlides, firstClone]
    setSlides(allSlides)
    setCurrentSlideIndex(1)
    updateCarousel(true)
  
    prevBtn.addEventListener("click", () => changeSlide(-1))
    nextBtn.addEventListener("click", () => changeSlide(1))
  }
  