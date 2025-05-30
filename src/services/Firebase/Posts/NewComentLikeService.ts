import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

// Incrementa el contador de likes en 1 para un comentario específico
export async function addCommentLike(postId: string, commentId: string) {
    const commentRef = doc(db, 'comments', postId, 'comment', commentId);
    await updateDoc(commentRef, {
        likes: increment(1)
    });
}

// Decrementa el contador de likes en 1 para un comentario específico (sin bajar de 0)
export async function removeCommentLike(postId: string, commentId: string) {
    const commentRef = doc(db, 'comments', postId, 'comment', commentId);
    await updateDoc(commentRef, {
        likes: increment(-1)
    });
}
