import { NavBar } from "./components/navBar";
import { NavbarLanding } from "./components/navbarLanding";
import { FooterElement } from "./components/footer";
import { CommentsOverlay } from "./components/postComponents/CommentsOverlay";
import { PostCard } from "./components/postComponents/Post";
import { PostSong } from "./components/postComponents/PostSong";
import { CommentCard } from "./components/postComponents/CommentCard";
import { WeeklyStats } from "./components/WeeklyStats";
import { ProfilePreview } from "./components/ProfilePreview";
import { CreatePost } from "./components/create_post";

if (!customElements.get("nav-bar")) {
    customElements.define("nav-bar", NavBar);
  }
  
customElements.define('navbar-landing', NavbarLanding);
customElements.define('footer-element', FooterElement);
customElements.define('comment-overlay', CommentsOverlay);
customElements.define('post-card', PostCard);
customElements.define('song-card', PostSong);
customElements.define('comment-card', CommentCard);
customElements.define('weekly-stats', WeeklyStats);
if (!customElements.get("profile-preview")) {
    customElements.define("profile-preview", ProfilePreview);
  }
if (!customElements.get('create-post')) {
    customElements.define('create-post', CreatePost);
  }
