import { HomePosts } from "./components/renderPosts/homePosts";
customElements.define('home-posts', HomePosts);
import { PostCard } from "./components/postComponents/Post";
customElements.define('post-card', PostCard)
import { PostSong } from "./components/postComponents/PostSong";
customElements.define('song-card', PostSong)
import { CommentsOverlay } from "./components/postComponents/CommentsOverlay";
customElements.define('comments-over', CommentsOverlay)
import { CommentCard } from "./components/postComponents/CommentCard";
customElements.define('comment-card', CommentCard)