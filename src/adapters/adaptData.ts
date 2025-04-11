export interface User {
    profilePicture: string;
    name: string;
    username: string;
  }
  
  export interface Song {
    img: string;
    mood: string;
    name: string;
    artistname: string;
    description: string;
  }
  
  export interface Post {
    likes: number;
    comments: number;
    likedby: string;
  }
  
  export interface Comment {
    profilePicture: string;
    name: string;
    username: string;
    comment: string;
    likes: number;
  }
  
  export type FormattedPost = {
    user: User;
    song: Song;
    post: Post;
    comments: Comment[];
  };

  export type SongWithUsername = Song & { username: string };

  
  export const dataToPost = (postArray: FormattedPost[]) => {
    return postArray.map(item => {
      const user = item.user;
      const song = item.song;
      const post = item.post;
      const comments = item.comments;
  
      return { user, song, comments, post };
    });
  };
  