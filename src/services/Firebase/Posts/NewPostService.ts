import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { PostType } from '../../../utils/types/PostType';
import { NewPostTypes } from '../../../flux/Actions';
import { AppDispatcher } from '../../../flux/Dispatcher';
import { serverTimestamp } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export async function createPost(post: Omit<PostType, 'id' | 'createdAt'>) {
  const postWithTimestamp = {
    ...post,
    createdAt: serverTimestamp(),
  };

  const postRef = await addDoc(collection(db, "posts"), postWithTimestamp);

const commentDocRef = doc(db, "comments", postRef.id);
  await setDoc(commentDocRef, {
    postId: postRef.id,
    createdAt: serverTimestamp(), // optional
  });

  AppDispatcher.dispatch({
    type: NewPostTypes.NEW_POST,
    payload: {
      ...post,
      id: postRef.id,
      createdAt:  Timestamp.fromDate(new Date()),
    },
  });
}
