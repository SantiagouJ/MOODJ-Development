// services/Firebase/FollowService.ts
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export async function followUser(currentUserId: string, targetUserId: string) {
  if (currentUserId === targetUserId) return;

  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayUnion(targetUserId),
  });

  await updateDoc(targetUserRef, {
    followers: arrayUnion(currentUserId),
  });
}

export async function isFollowing(currentUserId: string, targetUserId: string): Promise<boolean> {
  if (!currentUserId || !targetUserId) return false;

  const docRef = doc(db, "users", currentUserId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return false;

  const following = snap.data().following || [];
  return following.includes(targetUserId);
}

export async function unfollowUser(currentUserId: string, targetUserId: string) {
  if (currentUserId === targetUserId) return;

  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUserId),
  });

  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUserId),
  });
}
