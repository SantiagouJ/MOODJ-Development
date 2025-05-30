import { db } from "../FirebaseConfig";
import { auth } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";


const createListForUser = async (userId: string) => {
    try {
        const listRef = doc(db, "lists", userId);
        await setDoc(listRef, {
            userId,
            createdAt: new Date()
        });

        // Optional: create first task
        await addDoc(collection(listRef, "tasks"), {
            title: "Welcome task",
            description: "This is your first task!",
            done: false,
        });
    } catch (error) {
        console.error("Failed to create list:", error);
    }
};



const registerUser = async (email: string, password: string, username: string, pfp: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

		// Save extra user info in Firestore
		await setDoc(doc(db, "users", user.uid), {
			email: user.email,
			username: username,
            name: username,
            pfp: pfp,
            followers: [],
            following: [],
			createdAt: new Date()
		});

        await createListForUser(user.uid);
        return { isRegistered: true, user: userCredential };
	} catch (error) {
		console.error(error);
		return { isRegistered: false, error: error };
	}
};

export {registerUser}
