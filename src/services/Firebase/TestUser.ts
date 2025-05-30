import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserActions } from "../../flux/Actions";
import { fetchUser } from "./GetUserService";

export async function loginWithTestUser() {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      "mulett@gmail.com",
      "noviecito"
    );
    const user = userCredential.user;

    // ✅ Fetch and send user profile from Firestore
    const userProfile = await fetchUser(user.uid);
    if (userProfile) {
      UserActions.setUser(userProfile);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}

