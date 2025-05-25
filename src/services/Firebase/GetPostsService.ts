import { collection, getDocs } from "firebase/firestore";
import { PostType } from "../../utils/types/PostType";
import { db } from "./FirebaseConfig";

export async function fetchPosts(): Promise<PostType[]> {
    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);
    const posts: PostType[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            title: data.title,
            artist: data.artist,
            album: data.album,
            audio: data.audio,
            mood: data.mood,
            caption: data.caption || '',
            userId: data.userId,
        }
    })
    return posts;
}
