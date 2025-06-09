import { NavigationActions } from "../../../flux/Actions";
import { fetchPostByUserId } from "../../../services/Firebase/Profile/GetPostsUserService";
import { PostType } from "../../../utils/types/PostType";
import { store } from "../../../flux/Store";

class PrivateStats extends HTMLElement {
    private stats: { [key: string]: number } = {
        happy: 0,
        sad: 0,
        bored: 0,
        angry: 0
    };

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    async connectedCallback() {
        await this.calculateStats()
        this.render()
        this.addEventListeners()
    }

    private getMoodFromPath(moodPath: string): string {
        // Extract the mood name from the path (e.g., "images/moods2/Worried.svg" -> "worried")
        const fileName = moodPath.split('/').pop() || '';
        const moodName = fileName.replace('.svg', '').toLowerCase();
        return moodName;
    }

    private async calculateStats() {
        try {
            const state = store.getState();
            const currentUser = state.userProfile;
            
            if (!currentUser?.id) {
                console.log('No user found');
                return;
            }

            const posts = await fetchPostByUserId(currentUser.id);
            console.log('User posts fetched:', posts);

            const totalPosts = posts.length;
            console.log('Total user posts:', totalPosts);
            
            if (totalPosts === 0) {
                console.log('No posts found for user');
                return;
            }

            const moodCount: { [key: string]: number } = {
                happy: 0,
                sad: 0,
                bored: 0,
                angry: 0
            };

            posts.forEach((post: PostType) => {
                const moodPath = post.mood?.toLowerCase() || '';
                const mood = this.getMoodFromPath(moodPath);
                console.log('Processing post mood:', mood, 'from path:', moodPath);
                
                // Happy moods
                if (['happy', 'smily', 'love'].includes(mood)) {
                    moodCount.happy += 1;
                }
                // Sad moods
                else if (['sad', 'cry', 'crying'].includes(mood)) {
                    moodCount.sad += 1;
                }
                // Bored moods
                else if (['bored', 'serious', 'worried'].includes(mood)) {
                    moodCount.bored += 1;
                }
                // Angry moods
                else if (['angry', 'mad'].includes(mood)) {
                    moodCount.angry += 1;
                }
            });

            console.log('Mood counts:', moodCount);

            // Calculate percentages
            Object.keys(this.stats).forEach(mood => {
                this.stats[mood] = Math.round((moodCount[mood] / totalPosts) * 100);
            });

            console.log('Final stats:', this.stats);
            
            // Force a re-render after stats are calculated
            this.render();
        } catch (error) {
            console.error('Error calculating stats:', error);
        }
    }

    addEventListeners() {
        if (!this.shadowRoot) return;
        const prevBtn = this.shadowRoot.querySelector('#prev-btn');
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            NavigationActions.navigate('/profile');
        });
    }

    private getMajorMood(): string {
        const entries = Object.entries(this.stats);
        if (entries.length === 0) return 'neutral';
        
        const [maxMood] = entries.reduce((max, current) => 
            current[1] > max[1] ? current : max
        );
        
        return maxMood.charAt(0).toUpperCase() + maxMood.slice(1);
    }

    render(){ 
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `
            <link rel="stylesheet" href="/styles/privateStats.css">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

            <section class="stats-section">
                <span id="prev-btn" class="carousel-prev material-symbols-outlined">keyboard_arrow_left</span>          

                <div class="stats-header">
                    <img src="images/stats/left-bubbles.svg" alt="left bubbles" class="bubble-decoration left">
                    
                    <div class="title-texts">
                        <h1 class="main-title">Know your stats!</h1>
                        <p class="subtitle">This week you felt:</p>
                    </div>
                    
                    <img src="images/stats/right-bubbles.svg" alt="right bubbles" class="bubble-decoration right">
                </div>

                <div class="statsbox">
                    <div class="stats-data">
                        <div class="happy-data"><p>Happy ${this.stats.happy}%</p></div>
                        <div class="sad-data"><p>Sad ${this.stats.sad}%</p></div>
                        <div class="bored-data"><p>Bored ${this.stats.bored}%</p></div>
                        <div class="angry-data"><p>Angry ${this.stats.angry}%</p></div>
                        <div class="division">
                            <img src="images/stats/Line.svg" alt="line" class="line">
                        </div>
                    </div>

                    <div class="bubble happy">
                        <img src="images/stats/yellow circle.svg" alt="Happy face" class="happy-icon">
                    </div>
                    <div class="bubble sad">
                        <img src="images/stats/sad circle.svg" alt="sad face" class="sad-icon">
                    </div>
                    <div class="bubble bored">
                        <img src="images/stats/serious circle.svg" alt="bored face" class="bored-icon">
                    </div>
                    <div class="bubble angry">
                        <img src="images/stats/mad circle.svg" alt="mad face" class="mad-icon">
                    </div>
                </div>

                <div class="stats-title">
                    <p>You felt mainly ${this.getMajorMood()}, and your songs helped you express that!</p>
                </div>

                <div class="mobile-stats-data">
                    <div class="mobile-happy-data"><p>Happy ${this.stats.happy}%</p></div>
                    <div class="mobile-sad-data"><p>Sad ${this.stats.sad}%</p></div>
                    <div class="mobile-bored-data"><p>Bored ${this.stats.bored}%</p></div>
                    <div class="mobile-angry-data"><p>Angry ${this.stats.angry}%</p></div>
                    <div class="mobile-division"></div>
                </div>
            </section>
            `
        }
    }
}

export {PrivateStats}