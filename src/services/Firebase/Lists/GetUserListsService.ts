import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { ListType } from "../../../utils/types/ListType";

export async function fetchUserLists(userId: string): Promise<ListType[]> {
  const listsRef = collection(db, "lists");
  const q = query(
    listsRef, 
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);

  const lists: ListType[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      posts: data.posts || [],
    };
  });

  // Ordenar en el cliente por createdAt descendente
  return lists.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
} 