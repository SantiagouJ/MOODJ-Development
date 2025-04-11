export interface Song {
    title: string
    artist: {
      name: string
    };
    album: {
      cover_xl: string
    };
    preview: string
  }
  
  export interface NewMoodj  {
    mood: string,
    text: string;
    song: string;
    cover: string;
    preview: string;
    artist: string;
    user: {
      profilePicture: string;
      name: string;
      username: string;
    };
  }
  