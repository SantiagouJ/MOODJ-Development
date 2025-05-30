import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export async function updateUserName(userId: string, newName: string) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    name: newName,
  });
}
