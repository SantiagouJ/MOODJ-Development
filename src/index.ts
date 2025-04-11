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
import { HomePosts } from "./components/renderPosts/homePosts";
import { RecentPosts } from "./components/newPost";
import { Home } from "./components/pageComponents/Home";


if (!customElements.get("nav-bar")) {
    customElements.define("nav-bar", NavBar);
  }
  if (!customElements.get("profile-preview")) {
    customElements.define("profile-preview", ProfilePreview);
  }
if (!customElements.get('create-post')) {
    customElements.define('create-post', CreatePost);
  }
if (!customElements.get('create-post')) {
    customElements.define('create-post', CreatePost);
  }
customElements.define('navbar-landing', NavbarLanding);
customElements.define('footer-element', FooterElement);
customElements.define('post-card', PostCard);
customElements.define('song-card', PostSong);
customElements.define('comment-card', CommentCard);
customElements.define('weekly-stats', WeeklyStats);
customElements.define('home-posts', HomePosts);
customElements.define('comments-over', CommentsOverlay)
customElements.define('recent-posts', RecentPosts)
customElements.define('home-page', Home);
