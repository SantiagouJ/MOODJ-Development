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
customElements.define('comment-card', CommentCard)

import { RecentPosts } from "./components/newPost";
customElements.define('recent-posts', RecentPosts)
