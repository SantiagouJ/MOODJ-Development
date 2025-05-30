import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword
} from "firebase/auth";


const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { isLoggedIn: true, user: userCredential };
  } catch (error) {
    console.error(error);
    return { isLoggedIn: false, error: error };
  }
}

export {loginUser}