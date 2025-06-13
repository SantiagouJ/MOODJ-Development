export interface ListType {
  id: string;
  userId: string;
  createdAt: Date;
  posts: string[]; // Array de postIds
} 