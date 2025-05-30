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

  export type SongWithUsername = Song & { username: string };

  