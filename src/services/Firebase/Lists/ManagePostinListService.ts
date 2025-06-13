import { doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { fetchUserLists } from "./GetUserListsService";

export async function addPostToList(listId: string, postId: string) {
  const listRef = doc(db, "lists", listId);
  await updateDoc(listRef, {
    posts: arrayUnion(postId)
  });
}

export async function removePostFromList(listId: string, postId: string) {
  const listRef = doc(db, "lists", listId);
  await updateDoc(listRef, {
    posts: arrayRemove(postId)
  });
}

// Función principal para manejar el guardado/des-guardado de posts
export async function togglePostInLists(userId: string, postId: string): Promise<{saved: boolean, listName: string}> {
  const lists = await fetchUserLists(userId);
  
  // Todos los usuarios deben tener al menos una lista (creada en el registro)
  if (lists.length === 0) {
    throw new Error("Error: No se encontraron listas para este usuario");
  }

  // Buscar si el post ya está guardado en alguna lista
  const listWithPost = lists.find(list => list.posts.includes(postId));
  
  if (listWithPost) {
    // Si está guardado, quitarlo
    await removePostFromList(listWithPost.id, postId);
    return { saved: false, listName: "Lista de guardados" };
  } else {
    // Si no está guardado, agregarlo a la primera lista (por defecto)
    await addPostToList(lists[0].id, postId);
    return { saved: true, listName: "Lista de guardados" };
  }
}

// Verificar si un post está guardado en alguna lista del usuario
export async function isPostSaved(userId: string, postId: string): Promise<boolean> {
  const lists = await fetchUserLists(userId);
  return lists.some(list => list.posts.includes(postId));
} 