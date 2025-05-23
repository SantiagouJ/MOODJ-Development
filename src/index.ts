// Navigation Components
import { NavBar } from "./components/navBar";
import { NavbarLanding } from "./components/navbarLanding";
import { FooterElement } from "./components/footer";

// Post and Comment Components
import { CreatePost } from "./components/create_post";
import { PostCard } from "./components/postComponents/Post";
import { PostSong } from "./components/postComponents/PostSong";
import { CommentsOverlay } from "./components/postComponents/CommentsOverlay";
import { CommentCard } from "./components/postComponents/CommentCard";
import { HomePosts } from "./components/renderPosts/homePosts";
import { RecentPosts } from "./components/newPost";

// Stats and Profile Components
import { WeeklyStats } from "./components/WeeklyStats";
import { ProfilePreview } from "./components/ProfilePreview";
import { PrivateStats } from "./components/PrivateStats";
import { UserLists } from "./components/userLists";

// Page Components
import { Home } from "./components/pageComponents/Home";
import { Profile } from "./components/pageComponents/Profile";
import { LandingPage } from "./components/pageComponents/LandingPage";
import { SignUp } from "./components/pageComponents/SignUp";

// Profile Related Components
import { ProfileRender } from "./components/profileComponents/ProfileRender";
import { ProfilePost } from "./components/profileComponents/ProfilePost";
import { AProfilePost } from "./components/otherProfile/AProfilePost";
import { OtherProfile } from "./components/otherProfile/OtherProfile";

// Landing Page Components
import { BannerLanding } from "./components/landingpage/bannerLanding";
import { InfoLanding } from "./components/landingpage/infoLanding";
import { BannerTwo } from "./components/landingpage/bannerTwo";
import { BannerThree } from "./components/landingpage/bannerThree";

// Authentication Components
import { SignUpComp } from "./components/SignUpComp";
import { logIn } from "./components/logIn";

// Carousel Components
import { UserCarousel } from "./components/suggCarouselComponents/userCarousel";
import { UserCard } from "./components/suggCarouselComponents/userCard";
import { CarouselComponent } from "./components/suggCarouselComponents/carouselComponent";

// Define Navigation Components
if (!customElements.get("nav-bar")) {
    customElements.define("nav-bar", NavBar);
}
customElements.define('navbar-landing', NavbarLanding);
customElements.define('footer-element', FooterElement);

// Define Post and Comment Components
if (!customElements.get('create-post')) {
    customElements.define('create-post', CreatePost);
}
customElements.define('post-card', PostCard);
customElements.define('song-card', PostSong);
customElements.define('comment-card', CommentCard);
customElements.define('home-posts', HomePosts);
customElements.define('comments-over', CommentsOverlay);
customElements.define('recent-posts', RecentPosts);

// Define Stats and Profile Components
if (!customElements.get("profile-preview")) {
    customElements.define("profile-preview", ProfilePreview);
}
customElements.define('weekly-stats', WeeklyStats);
customElements.define('private-stats', PrivateStats);
customElements.define('user-lists', UserLists);

// Define Page Components
customElements.define('home-page', Home);
customElements.define('profile-page', Profile);
customElements.define('landing-page', LandingPage);
customElements.define('sign-up', SignUp);

// Define Profile Related Components
customElements.define('profile-render', ProfileRender);
customElements.define('profile-post', ProfilePost);
customElements.define('a-profile-post', AProfilePost);
customElements.define('other-profile', OtherProfile);

// Define Landing Page Components
customElements.define('banner-landing', BannerLanding);
customElements.define('info-landing', InfoLanding);
customElements.define('banner-two', BannerTwo);
customElements.define('banner-three', BannerThree);

// Define Authentication Components
customElements.define('sign-up-comp', SignUpComp);
customElements.define('log-in', logIn);

// Define Carousel Components
customElements.define('user-carousel', UserCarousel);
customElements.define('user-card', UserCard);
customElements.define('carousel-component', CarouselComponent);


