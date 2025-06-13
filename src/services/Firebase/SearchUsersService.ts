import { collection, getDocs } from "firebase/firestore";
import { UserType } from "../../utils/types/UserType";
import { db } from "./FirebaseConfig";

// Debug function to check all users in database
export async function getAllUsers(): Promise<UserType[]> {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        username: data.username || '',
        name: data.name || '',
        pfp: data.pfp || '/images/moods2/Happy.svg',
        followers: data.followers || [],
        following: data.following || []
      } as UserType;
    });
    
    console.log('All users in database:', users);
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}

export async function searchUsers(searchTerm: string, maxResults: number = 5): Promise<UserType[]> {
  if (!searchTerm.trim()) {
    return [];
  }

  const usersRef = collection(db, "users");
  const searchLower = searchTerm.toLowerCase();
  
  try {
    // Get all users and filter on client side for better flexibility
    const snapshot = await getDocs(usersRef);
    const allUsers: UserType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        username: data.username || '',
        name: data.name || '',
        pfp: data.pfp || '/images/moods2/Happy.svg', // fallback image
        followers: data.followers || [],
        following: data.following || []
      } as UserType;
    });

    console.log('All users found:', allUsers.length);
    console.log('Search term:', searchTerm);
    console.log('Users data:', allUsers);

    // Filter users based on search term (case insensitive)
    const filteredUsers = allUsers.filter(user => {
      const usernameMatch = user.username.toLowerCase().includes(searchLower);
      const nameMatch = user.name.toLowerCase().includes(searchLower);
      const matches = usernameMatch || nameMatch;
      
      if (matches) {
        console.log(`User "${user.name}" (@${user.username}) matches search "${searchTerm}"`);
      }
      
      return matches;
    });

    console.log('Filtered users:', filteredUsers);

    // Sort results: exact matches first, then partial matches
    const sortedUsers = filteredUsers.sort((a, b) => {
      const aUsernameExact = a.username.toLowerCase() === searchLower;
      const bUsernameExact = b.username.toLowerCase() === searchLower;
      const aNameExact = a.name.toLowerCase() === searchLower;
      const bNameExact = b.name.toLowerCase() === searchLower;
      
      const aUsernameStarts = a.username.toLowerCase().startsWith(searchLower);
      const bUsernameStarts = b.username.toLowerCase().startsWith(searchLower);
      const aNameStarts = a.name.toLowerCase().startsWith(searchLower);
      const bNameStarts = b.name.toLowerCase().startsWith(searchLower);

      // Exact matches first
      if ((aUsernameExact || aNameExact) && !(bUsernameExact || bNameExact)) return -1;
      if (!(aUsernameExact || aNameExact) && (bUsernameExact || bNameExact)) return 1;

      // Then matches that start with search term
      if ((aUsernameStarts || aNameStarts) && !(bUsernameStarts || bNameStarts)) return -1;
      if (!(aUsernameStarts || aNameStarts) && (bUsernameStarts || bNameStarts)) return 1;

      // Then alphabetically by username
      return a.username.localeCompare(b.username);
    });

    return sortedUsers.slice(0, maxResults);
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
} 