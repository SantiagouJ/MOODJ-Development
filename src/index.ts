import { NavBar } from "./components/navBar";
import { NavbarLanding } from "./components/navbarLanding";
import { FooterElement } from "./components/footer";
import CreatePost from "./components/create_post"
if (!customElements.get('create-post')) {
    customElements.define('create-post', CreatePost);
  }
import { HomePosts } from "./components/renderPosts/homePosts";
customElements.define('home-posts', HomePosts);
import { PostCard } from "./components/postComponents/Post";
customElements.define('post-card', PostCard)
import { PostSong } from "./components/postComponents/PostSong";
customElements.define('song-card', PostSong)
import { CommentsOverlay } from "./components/postComponents/CommentsOverlay";
customElements.define('comments-over', CommentsOverlay)
import { CommentCard } from "./components/postComponents/CommentCard";
import { WeeklyStats } from "./components/WeeklyStats";
import { ProfilePreview } from "./components/ProfilePreview";
import { ErrorMessage } from "./components/ErrorComp";

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
  
  if (!customElements.get("error-message")) {
    customElements.define("error-message", ErrorMessage);
  }
customElements.define('comment-card', CommentCard)

import { RecentPosts } from "./components/newPost";
customElements.define('recent-posts', RecentPosts)
