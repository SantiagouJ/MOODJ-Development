export type CommentLikeType = {
    postId: string;
    commentId: string;
    increment: boolean; // true para dar like, false para quitar like
  };