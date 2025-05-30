import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export async function getFollowCount(userId: string): Promise<{ followers: number, following: number }> {
  const userDoc = await getDoc(doc(db, "users", userId));
  const data = userDoc.data();

  return {
    followers: data?.followers?.length || 0,
    following: data?.following?.length || 0
  };
}
