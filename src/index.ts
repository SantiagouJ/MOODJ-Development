// Navigation Components
import { NavBar } from "./components/navigationComponents/navBar";
import { NavbarLanding } from "./components/navigationComponents/navbarLanding";
import { FooterElement } from "./components/navigationComponents/footer";
import { Root } from "./pages/Root";

// Post and Comment Components
import { CreatePost } from "./components/homeComponents/CreatePost";
import { PostCard } from "./components/postComponents/Post";
import { PostSong } from "./components/postComponents/PostSong";
import { CommentsOverlay } from "./components/postComponents/CommentsOverlay";
import { CommentCard } from "./components/postComponents/CommentCard";
import { HomePosts } from "./components/homeComponents/homePosts";

// Stats and Profile Components
import { WeeklyStats } from "./components/homeComponents/WeeklyStats";
import { ProfilePreview } from "./components/navigationComponents/ProfilePreview";
import { PrivateStats } from "./components/profileComponents/stats/PrivateStats";
import { UserLists } from "./components/profileComponents/lists/userLists";
import { EditProfile } from "./components/profileComponents/EditProfile";

// Page Components
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { LandingPage } from "./pages/LandingPage";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
// Profile Related Components
import { ProfileRender } from "./components/profileComponents/ProfileRender";
import { ProfilePost } from "./components/profileComponents/ProfilePost";
import { OtherProfile } from "./pages/OtherProfile";

// Landing Page Components
import { BannerLanding } from "./components/landingComponents/bannerLanding";
import { InfoLanding } from "./components/landingComponents/infoLanding";
import { BannerTwo } from "./components/landingComponents/bannerTwo";
import { BannerThree } from "./components/landingComponents/bannerThree";

// Authentication Components
import { SignUpComp } from "./components/authComponents/SignUp";
import { AuthError } from "./components/AuthError";
import { LogInComp } from "./components/authComponents/logIn";

// Carousel Components
import { UserCard } from "./components/suggCarouselComponents/userCard";
import { UserCarousel } from "./components/suggCarouselComponents/CarouselUser";
import { CarouselComponent } from "./components/suggCarouselComponents/Carousel";

// Define Navigation Components
if (!customElements.get("nav-bar")) {
    customElements.define("nav-bar", NavBar);
}
if (!customElements.get('navbar-landing')) {
    customElements.define('navbar-landing', NavbarLanding);
}
if (!customElements.get('footer-element')) {
    customElements.define('footer-element', FooterElement);
}
if (!customElements.get('app-root')) {
    customElements.define('app-root', Root);
}

// Define Post and Comment Components
if (!customElements.get('create-post')) {
    customElements.define('create-post', CreatePost);
}
if (!customElements.get('post-card')) {
    customElements.define('post-card', PostCard);
}
if (!customElements.get('song-card')) {
    customElements.define('song-card', PostSong);
}
if (!customElements.get('comment-card')) {
    customElements.define('comment-card', CommentCard);
}
if (!customElements.get('home-posts')) {
    customElements.define('home-posts', HomePosts);
}
if (!customElements.get('comments-over')) {
    customElements.define('comments-over', CommentsOverlay);
}

// Define Stats and Profile Components
if (!customElements.get("profile-preview")) {
    customElements.define("profile-preview", ProfilePreview);
}
if (!customElements.get('weekly-stats')) {
    customElements.define('weekly-stats', WeeklyStats);
}
if (!customElements.get('private-stats')) {
    customElements.define('private-stats', PrivateStats);
}
if (!customElements.get('user-lists')) {
    customElements.define('user-lists', UserLists);
}
if (!customElements.get('edit-profile')) {
    customElements.define('edit-profile', EditProfile);
}

// Define Page Components
if (!customElements.get('home-page')) {
    customElements.define('home-page', Home);
}
if (!customElements.get('profile-page')) {
    customElements.define('profile-page', Profile);
}
if (!customElements.get('landing-page')) {
    customElements.define('landing-page', LandingPage);
}
if (!customElements.get('sign-up')) {
    customElements.define('sign-up', SignUp);
}
if (!customElements.get('log-in')) {
    customElements.define('log-in', LogIn);
}

// Define Profile Related Components
if (!customElements.get('profile-render')) {
    customElements.define('profile-render', ProfileRender);
}
if (!customElements.get('profile-post')) {
    customElements.define('profile-post', ProfilePost);
}
if (!customElements.get('other-profile')) {
    customElements.define('other-profile', OtherProfile);
}

// Define Landing Page Components
if (!customElements.get('banner-landing')) {
    customElements.define('banner-landing', BannerLanding);
}
if (!customElements.get('info-landing')) {
    customElements.define('info-landing', InfoLanding);
}
if (!customElements.get('banner-two')) {
    customElements.define('banner-two', BannerTwo);
}
if (!customElements.get('banner-three')) {
    customElements.define('banner-three', BannerThree);
}

// Define Authentication Components
if (!customElements.get('sign-up-comp')) {
    customElements.define('sign-up-comp', SignUpComp);
}
if (!customElements.get('auth-error')) {
    customElements.define('auth-error', AuthError);
}
if (!customElements.get('log-in-comp')) {
    customElements.define('log-in-comp', LogInComp);
}

// Define Carousel Components
if (!customElements.get('user-carousel')) {
    customElements.define('user-carousel', UserCarousel);
}
if (!customElements.get('user-card')) {
    customElements.define('user-card', UserCard);
}
if (!customElements.get('carousel-component')) {
    customElements.define('carousel-component', CarouselComponent);
}


