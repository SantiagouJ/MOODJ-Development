import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { PostType } from "../../../utils/types/PostType";
import { db } from "../FirebaseConfig";

export async function fetchPosts(): Promise<PostType[]> {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
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
            createdAt: data.createdAt?.toDate?.() || new Date(),
        }
    })
    return posts;
}
