import { CommentsOverlay } from "./components/postComponents/CommentsOverlay";
import { PostCard } from "./components/postComponents/Post";
import { PostSong } from "./components/postComponents/PostSong";
import { CommentCard } from "./components/postComponents/CommentCard";
import { WeeklyStats } from "./components/WeeklyStats";
import { ProfilePreview } from "./components/ProfilePreview";

customElements.define('comment-overlay', CommentsOverlay);
customElements.define('post-card', PostCard);
customElements.define('song-card', PostSong);
customElements.define('comment-card', CommentCard);
customElements.define('weekly-stats', WeeklyStats);
customElements.define('profile-preview', ProfilePreview);
