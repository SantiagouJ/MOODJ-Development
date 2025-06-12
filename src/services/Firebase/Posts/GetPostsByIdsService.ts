import { doc, getDoc } from "firebase/firestore";
import { PostType } from "../../../utils/types/PostType";
import { db } from "../FirebaseConfig";

export async function fetchPostsByIds(postIds: string[]): Promise<PostType[]> {
  if (postIds.length === 0) return [];

  const posts: PostType[] = [];
  
  // Obtener cada post por su ID
  for (const postId of postIds) {
    try {
      const postRef = doc(db, "posts", postId);
      const snapshot = await getDoc(postRef);
      
      if (snapshot.exists()) {
        const data = snapshot.data();
        posts.push({
          id: snapshot.id,
          title: data.title,
          artist: data.artist,
          album: data.album,
          audio: data.audio,
          mood: data.mood,
          caption: data.caption || '',
          userId: data.userId,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        });
      }
    } catch (error) {
      console.error(`Error fetching post ${postId}:`, error);
    }
  }

  // Ordenar por fecha de creación descendente
  return posts.sort((a, b) => {
    const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : a.createdAt.toDate().getTime();
    const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : b.createdAt.toDate().getTime();
    return timeB - timeA;
  });
} 