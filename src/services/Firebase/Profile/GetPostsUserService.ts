import { PostType } from "../../../utils/types/PostType";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export async function fetchPostByUserId(userId: string): Promise<PostType[]> {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
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
};