import { Timestamp } from "firebase/firestore";

export interface PostType {
    id: string,
    title: string,
    artist: string,
    album: string,
    audio: string,
    mood: string,
    caption: string,
    userId: string,
    createdAt: Timestamp
}