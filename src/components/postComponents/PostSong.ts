import { Song, SongWithUsername } from "../../adapters/adaptData";

class PostSong extends HTMLElement{ 
    private _data!: SongWithUsername; 
    private audio: HTMLAudioElement | null = null;
    private isPlaying: boolean = false;

    set data(value: SongWithUsername) {
        this._data = value;
        this.render();
    }

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    get data():Song {
        return this._data;
    }
    
    connectedCallback() {
        this.render()
        this.setupEventListeners();
    }

    private setupEventListeners() {
        if (this.shadowRoot) {
            const playButton = this.shadowRoot.getElementById('play-song');
            if (playButton) {
                playButton.addEventListener('click', () => this.togglePlay());
            }
        }
    }

    private togglePlay() {
        if (!this.audio) {
            this.audio = new Audio(this._data.previewUrl);
            this.audio.addEventListener('ended', () => {
                this.isPlaying = false;
                this.updatePlayButton();
            });
        }

        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.audio.play();
            this.isPlaying = true;
        }
        this.updatePlayButton();
    }

    private updatePlayButton() {
        if (this.shadowRoot) {
            const playButton = this.shadowRoot.getElementById('play-song');
            if (playButton) {
                playButton.textContent = this.isPlaying ? 'pause_circle' : 'play_circle';
            }
        }
    }

    render() {
        const { img, name, artistname, username, description, mood } = this._data;

        if (this.shadowRoot !== null) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/styles/postComponents/postContainer.css">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

                <div class="post-content">
                <h2 class="heading2">Hey, I'm feeling...</h2>
                <div class="song-card">
                <img src="${img}" alt="" id="album-cover">
                <div class="song-info">
                    <h3 id="song-title">${name}</h3>
                    <p id="artist-name">${artistname}</p>
                    <span class="material-symbols-outlined" id="play-song" style="cursor: pointer;">
                        play_circle
                    </span>
                    <p id="post-text"><span style="font-weight:600; color: rgba(255, 255, 255, 0.86);">${username}&nbsp;</span>${description}</p>  
                </div>
                <div class="mood-contain">
                    <img src="${mood}" alt="" id="mood-post">
                </div>   
                </div>
            `
        }
    }
}

export {PostSong};