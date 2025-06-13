import { getDocs, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { UserType } from "../../utils/types/UserType";

export async function fetchUsers(): Promise<UserType[]> {
  const usersCol = collection(db, "users");
  const snapshot = await getDocs(usersCol);

  const users: UserType[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      username: data.username,
      name: data.name,
      pfp: data.pfp,
      followers: data.followers,
      following: data.following
    };
  });

  return users;
}
