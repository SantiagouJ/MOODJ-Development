import { fetchPosts } from "../../services/Firebase/Posts/GetPostsService"
import { PostType } from "../../utils/types/PostType"

class WeeklyStats extends HTMLElement{
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
    }

    private getMoodFromPath(moodPath: string): string {
        // Extract the mood name from the path (e.g., "images/moods2/Worried.svg" -> "worried")
        const fileName = moodPath.split('/').pop() || '';
        const moodName = fileName.replace('.svg', '').toLowerCase();
        return moodName;
    }

    private async calculateStats() {
        try {
            const posts = await fetchPosts();

            const totalPosts = posts.length;

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
            Object.keys(this.stats).forEach(mood => {
                this.stats[mood] = Math.round((moodCount[mood] / totalPosts) * 100);
            });

            console.log('Final stats:', this.stats);
            
            // Force a re-render after stats are calculated
            this.render();
        } catch (error) {
            console.error('Error calculating stats:', error);
            return;
        }
    }

    render(){ 
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `

            <link rel="stylesheet" href="/styles/weeklyStyles.css">

            <div class="statsbox">
            <div class="stats-title">
                <p>Weekly statistics!</p>
            </div>
            <div class="stats-data">
                <div class="happy-data"><p>Happy ${this.stats.happy}%</p></div>
                <div class="sad-data"><p>Sad ${this.stats.sad}%</p></div>
                <div class="bored-data"><p>Bored ${this.stats.bored}%</p></div>
                <div class="angry-data"><p>Angry ${this.stats.angry}%</p></div>
                <div class="division"><img src="images/stats/Line.svg" alt="line" class="line"></div>
            </div>
            <div class="deco-bubbles">
                <img src="images/stats/mini circles.svg" alt="mini circles" class="mini-circles">
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

        <div class="mobile-stats-data">
                    <div class="mobile-happy-data"><p>${this.stats.happy}%</p></div>
                    <div class="mobile-sad-data"><p>${this.stats.sad}%</p></div>
                    <div class="mobile-bored-data"><p>${this.stats.bored}%</p></div>
                    <div class="mobile-angry-data"><p>${this.stats.angry}%</p></div>
                    <div class="mobile-division"></div>
                </div>
            `
        }
    }


}

export {WeeklyStats}