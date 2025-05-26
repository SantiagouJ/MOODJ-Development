import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { LikeType } from "../../../utils/types/LikeType";

export async function fetchLastLike(postId: string): Promise<LikeType | null> {
  const likesRef = collection(db, "likes");
  const q = query(
    likesRef,
    where("postId", "==", postId),

  );

  const snapshot = await getDocs(q);
  console.log("Like snapshot size:", snapshot.size);


  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    userId: data.userId,
    postId: data.postId,
    timestamp: data.timestamp
  };
}
