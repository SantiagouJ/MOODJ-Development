import { doc, getDoc } from "firebase/firestore";
import { UserType } from "../../utils/types/UserType";
import { db } from "./FirebaseConfig";


export async function fetchUser(userId: string): Promise<UserType | null> {
  const infoRef = doc(db, "users", userId);
  const snapshot = await getDoc(infoRef);

  if (!snapshot.exists()) {
    console.warn("No user info found");
    return null;
  }
  const data =  snapshot.data();
  return {
    id: snapshot.id,
    username: data.username,
    name: data.name,
    pfp: data.pfp,
    followers: data.followers,
    following: data.following
  } as UserType;
}
