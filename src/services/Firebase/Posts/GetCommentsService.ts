import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { CommentType } from "../../../utils/types/CommentType";

export async function fetchComments(postId: string): Promise<CommentType[]> {
    const q = query(collection(db, "comments"), where("postId", "==", postId));
  const snapshot = await getDocs(q);

   const commentSectionDoc = snapshot.docs[0];
   const commentsRef = collection(db, "comments", commentSectionDoc.id, "comment");
   const commentsSnap = await getDocs(commentsRef);
   
   return commentsSnap.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      content: data.content,
      likes: data.likes,
      userId: data.userId,
    };
})};