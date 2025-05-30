import { collection, addDoc, serverTimestamp, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { LikeType } from '../../../utils/types/LikeType';
import { LikeActions } from '../../../flux/Actions';

// Crear un nuevo like en Firestore y actualizar el estado global
export async function createLike(userId: string, postId: string) {
    const likeData = {
        userId,
        postId,
        timestamp: serverTimestamp(),
    };
    // Agregar el like a Firestore
    const likeRef = await addDoc(collection(db, 'likes'), likeData);
    // Construir el objeto LikeType para el estado global
    const newLike: LikeType = {
        id: likeRef.id,
        userId,
        postId,
        timestamp: likeData.timestamp as Timestamp, // El store puede actualizarlo luego si es necesario
    };
    // Despachar acción para agregar el like al estado global
    LikeActions.addLike(newLike);
    return newLike;
}

// Eliminar un like de Firestore y actualizar el estado global
export async function removeLike(like: LikeType) {
    // Eliminar el documento de Firestore
    await deleteDoc(doc(db, 'likes', like.id));
    // Despachar acción para eliminar el like del estado global
    LikeActions.removeLike(like);
}
