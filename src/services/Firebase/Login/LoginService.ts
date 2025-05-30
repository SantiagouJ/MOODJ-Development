import { auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fetchUser } from "../GetUserService";
import { UserActions } from "../../../flux/Actions";

const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    if (!firebaseUser || !firebaseUser.uid) {
      throw new Error("No user ID found after login.");
    }

    const userProfile = await fetchUser(firebaseUser.uid);

    if (userProfile) {
      UserActions.setUser(userProfile);
      return { isLoggedIn: true, user: userProfile };
    } else {
      return { isLoggedIn: false, error: "User profile not found." };
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
      return { isLoggedIn: false, error: error.message };
    }
    console.error("Login error:", error);
    return { isLoggedIn: false, error: "Unknown error" };
  }
};

export { loginUser };
