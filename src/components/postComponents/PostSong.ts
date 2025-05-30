
class PostSong extends HTMLElement{ 
    private audio: HTMLAudioElement | null = null;
    private isPlaying: boolean = false;

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    
    connectedCallback() {
        this.render()
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
        <link rel="stylesheet" href="/styles/postComponents/postContainer.css">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

            <div class="post-content">
            <h2 class="heading2">Hey, I'm feeling...</h2>
            <div class="song-card">
            <img src="${album}" alt="" id="album-cover">
            <div class="song-info">
                <h3 id="song-title">${title}</h3>
                <p id="artist-name">${artist}</p>
                <span class="material-symbols-outlined" id="play-song" style="cursor: pointer;">
                        play_circle
                </span>
                <p id="post-text"><span style="font-weight:600; color: rgba(255, 255, 255, 0.86);">@${username}&nbsp;</span>${caption}</p>  
            </div>
            <div class="mood-contain">
                <img src="${mood}" alt="" id="mood-post">
            </div>   
            </div>
        `
        const playButton = this.shadowRoot.getElementById('play-song');
        let playing = false;
        playButton?.addEventListener('click', () => {
            if(playing == false) {
                playButton.textContent = 'play_circle';
                playing = true;
            } else {
                playButton.textContent = 'pause_circle'
                playing = false;
            }
        })
        }
    }
}

export {PostSong};