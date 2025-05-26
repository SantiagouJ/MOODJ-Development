import { Timestamp } from "firebase/firestore";

export interface CommentType {
    id: string,
    content: string,
    likes: number, 
    userId: string,
    createdAt?: Timestamp
}