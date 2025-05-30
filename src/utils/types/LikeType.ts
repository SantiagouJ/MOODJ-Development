import { Timestamp } from "firebase/firestore"

export interface LikeType {
    id: string,
    userId: string,
    postId: string
    timestamp: Timestamp
}