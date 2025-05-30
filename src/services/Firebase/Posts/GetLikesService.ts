import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { LikeType } from "../../../utils/types/LikeType";


export async function fetchLikes(postId: string): Promise<LikeType[]> {
  const likesRef = collection(db, "likes");
  const q = query(likesRef, where("postId", "==", postId));
  const snapshot = await getDocs(q);

  const likes: LikeType[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      postId: data.postId,
      timestamp: data.timestamp
    };
  });

  return likes;
}
