import { getFreshPreview } from "../../utils/musicAPI/musicSearch";

class PostSong extends HTMLElement{ 
    private audio: HTMLAudioElement | null = null;
    private isPlaying: boolean = false;
    private isLoading: boolean = false;

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    
    connectedCallback() {
        this.render()
    }

    async playAudio() {
        if (this.isLoading) return;

        const title = this.getAttribute('title');
        const artist = this.getAttribute('artist');
        const playButton = this.shadowRoot?.getElementById('play-song');

        if (!title || !artist || !playButton) return;

        try {
            this.isLoading = true;
            const container = this.shadowRoot?.getElementById('play-song-container');
            if (container) {
                container.innerHTML = '<div class="loading-spinner"></div>';
            }

            // Obtener preview fresco de la API
            const freshPreview = await getFreshPreview(title, artist);
            
            if (!freshPreview) {
                console.error('No se pudo obtener el preview de la canción');
                this.isLoading = false;
                const container = this.shadowRoot?.getElementById('play-song-container');
                if (container) {
                    container.innerHTML = '<span class="material-symbols-outlined" id="play-song" style="color: #ff4444;">error</span>';
                    setTimeout(() => {
                        container.innerHTML = '<span class="material-symbols-outlined" id="play-song">play_circle</span>';
                    }, 2000);
                }
                return;
            }

            // Si ya hay un audio reproduciéndose, pausarlo
            if (this.audio) {
                this.audio.pause();
                this.audio = null;
            }

            // Crear nuevo audio con el preview fresco
            this.audio = new Audio(freshPreview);
            
            // Configurar eventos del audio
            this.audio.addEventListener('ended', () => {
                this.isPlaying = false;
                const container = this.shadowRoot?.getElementById('play-song-container');
                if (container) {
                    container.innerHTML = '<span class="material-symbols-outlined" id="play-song">play_circle</span>';
                }
            });

            this.audio.addEventListener('loadeddata', () => {
                this.isLoading = false;
                const container = this.shadowRoot?.getElementById('play-song-container');
                if (container) {
                    container.innerHTML = '<span class="material-symbols-outlined" id="play-song" style="color: #C06DFF;">pause_circle</span>';
                }
            });

            this.audio.addEventListener('error', () => {
                this.isLoading = false;
                this.isPlaying = false;
                const container = this.shadowRoot?.getElementById('play-song-container');
                if (container) {
                    container.innerHTML = '<span class="material-symbols-outlined" id="play-song" style="color: #ff4444;">error</span>';
                    setTimeout(() => {
                        container.innerHTML = '<span class="material-symbols-outlined" id="play-song">play_circle</span>';
                    }, 2000);
                }
            });

            // Reproducir el audio
            await this.audio.play();
            this.isPlaying = true;

        } catch (error) {
            console.error('Error al reproducir audio:', error);
            this.isLoading = false;
            this.isPlaying = false;
            const container = this.shadowRoot?.getElementById('play-song-container');
            if (container) {
                container.innerHTML = '<span class="material-symbols-outlined" id="play-song" style="color: #ff4444;">error</span>';
                setTimeout(() => {
                    container.innerHTML = '<span class="material-symbols-outlined" id="play-song">play_circle</span>';
                }, 2000);
            }
        }
    }

    pauseAudio() {
        if (this.audio && this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            const container = this.shadowRoot?.getElementById('play-song-container');
            if (container) {
                container.innerHTML = '<span class="material-symbols-outlined" id="play-song">play_circle</span>';
            }
        }
    }

    render() {
    
        if (this.shadowRoot !== null) {
        const album = this.getAttribute('album');
        const title = this.getAttribute('title');
        const artist = this.getAttribute('artist');
        const mood = this.getAttribute('mood');
        const caption = this.getAttribute('caption');
        const username = this.getAttribute('username');

        this.shadowRoot.innerHTML = `
        <style>
        .loading-spinner {
            width: 24px;
            height: 24px;
            border: 3px solid rgba(192, 109, 255, 0.3);
            border-top: 3px solid #C06DFF;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0;
            flex-shrink: 0;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        #play-song-container {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            min-width: 24px;
            min-height: 24px;
            box-sizing: border-box;
        }
        
        #play-song-container .material-symbols-outlined {
            font-size: 32px;
            line-height: 1;
            margin: 0;
            padding: 0;
        }
        </style>
        <link rel="stylesheet" href="/styles/postComponents/postContainer.css">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

            <div class="post-content">
            <h2 class="heading2">Hey, I'm feeling...</h2>
            <div class="song-card">
            <img src="${album}" alt="" id="album-cover">
            <div class="song-info">
                <h3 id="song-title">${title}</h3>
                <p id="artist-name">${artist}</p>
                <div id="play-song-container" style="cursor: pointer;">
                    <span class="material-symbols-outlined" id="play-song">
                        play_circle
                    </span>
                </div>
                <p id="post-text"><span style="font-weight:600; color: rgba(255, 255, 255, 0.86);">@${username}&nbsp;</span>${caption}</p>  
            </div>
            <div class="mood-contain">
                <img src="${mood}" alt="" id="mood-post">
            </div>   
            </div>
        `
        const playContainer = this.shadowRoot.getElementById('play-song-container');
        
        playContainer?.addEventListener('click', async () => {
            if (this.isLoading) return;

            if (this.isPlaying) {
                this.pauseAudio();
            } else {
                await this.playAudio();
            }
        });
        }
    }

    // Limpiar el audio cuando el componente se desconecte
    disconnectedCallback() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
    }
}

export {PostSong};