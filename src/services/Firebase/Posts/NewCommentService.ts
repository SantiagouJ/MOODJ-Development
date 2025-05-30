import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { CommentType } from "../../../utils/types/CommentType";


export async function createComment(postId: string, comment: Omit<CommentType, 'id' | 'createdAt'>) {
  const commentRef = collection(db, "comments", postId, "comment");

  await addDoc(commentRef, {
    ...comment,
    likes: 0,
    createdAt: serverTimestamp(),
  });
}
