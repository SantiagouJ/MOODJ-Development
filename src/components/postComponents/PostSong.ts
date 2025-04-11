class PostSong extends HTMLElement{ 
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
    }
    render() {
        if (this.shadowRoot !== null) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/postComponents/postContainer.css">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

            <div class="post-content">
            <h2 class="heading2">Hey, I'm feeling...</h2>
            <div class="song-card">
            <img src="https://cdn-images.dzcdn.net/images/cover/1f1e8acf2420b6d04240281b41185213/0x1900-000000-80-0-0.jpg" alt="" id="album-cover">
            <div class="song-info">
                <h3 id="song-title">For Lovers</h3>
                <p id="artist-name">Lamp</p>
                <span class="material-symbols-outlined" id="play-song">
                    play_circle
                </span>
                <p id="post-text"><span style="font-weight:600; color: rgba(255, 255, 255, 0.86);">Username</span> this song is so amazing! Makes me wanna dance all day and all night long hahahahahahhaah </p>  
            </div>
            <div class="mood-contain">
                <img src="/icons/smily.svg" alt="" id="mood-post">
            </div>   
            </div>
        `

    }
}}
export {PostSong};