import { NavBar } from "./components/navBar";
import { FooterElement } from "./components/footer";
import { UserCard } from "./components/carouselComponents/userCard";
import { UserCarousel } from "./components/carouselComponents/userCarousel";
import { CarouselComponent } from "./components/carouselComponents/carouselComponent";


customElements.define('nav-bar', NavBar);
customElements.define('footer-element', FooterElement);
customElements.define('user-card', UserCard);
customElements.define('user-carousel', UserCarousel);
customElements.define('carousel-component', CarouselComponent);

