// Navigation Components
import { NavBar } from "./components/navigationComponents/navBar";
import { NavbarLanding } from "./components/navigationComponents/navbarLanding";
import { FooterElement } from "./components/navigationComponents/footer";

// Post and Comment Components
import { CreatePost } from "./components/homeComponents/CreatePost";
import { PostCard } from "./components/postComponents/Post";
import { PostSong } from "./components/postComponents/PostSong";
import { CommentsOverlay } from "./components/postComponents/CommentsOverlay";
import { CommentCard } from "./components/postComponents/CommentCard";
import { HomePosts } from "./components/homeComponents/homePosts";
import { RecentPosts } from "./components/newPost";

// Stats and Profile Components
import { WeeklyStats } from "./components/homeComponents/WeeklyStats";
import { ProfilePreview } from "./components/navigationComponents/ProfilePreview";
import { PrivateStats } from "./components/profileComponents/stats/PrivateStats";
import { UserLists } from "./components/profileComponents/lists/userLists";

// Page Components
import { Root } from "./Root/Root";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { LandingPage } from "./pages/LandingPage";
import { SignUp } from "./pages/SignUp";

// Profile Related Components
import { ProfileRender } from "./components/profileComponents/ProfileRender";
import { ProfilePost } from "./components/profileComponents/ProfilePost";
import { AProfilePost } from "./components/otherProfileComponents/AProfilePost";
import { OtherProfile } from "./pages/OtherProfile";

// Landing Page Components
import { BannerLanding } from "./components/landingComponents/bannerLanding";
import { InfoLanding } from "./components/landingComponents/infoLanding";
import { BannerTwo } from "./components/landingComponents/bannerTwo";
import { BannerThree } from "./components/landingComponents/bannerThree";

// Authentication Components
import { SignUpComp } from "./components/authComponents/SignUp";
import { logIn } from "./components/authComponents/logIn";
import { AuthError } from "./components/AuthError";

// Carousel Components
import { UserCarousel } from "./components/suggCarouselComponents/userCarousel";
import { UserCard } from "./components/suggCarouselComponents/userCard";
import { CarouselComponent } from "./components/suggCarouselComponents/Carousel";

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
customElements.define("profile-preview", ProfilePreview);
customElements.define('weekly-stats', WeeklyStats);
customElements.define('private-stats', PrivateStats);
customElements.define('user-lists', UserLists);

// Define Page Components
customElements.define('root-element', Root)
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
customElements.define('auth-error', AuthError)

// Define Carousel Components
customElements.define('user-carousel', UserCarousel);
customElements.define('user-card', UserCard);
customElements.define('carousel-component', CarouselComponent);


