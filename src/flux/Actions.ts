import { PostType } from '../utils/types/PostType';
import { AppDispatcher } from './Dispatcher';
import { UserCredential } from "firebase/auth";


export const DataActionTypes = {
    GET_POSTS:'GET_POSTS',
    GET_USER_POSTS: 'GET_USER_POSTS'
} as const;

export const NewPostTypes = {
    NEW_POST: 'NEW_POST'
} as const;

export const UserActionsType = {
    SAVE_USER: 'SAVE_USER',
    CHECK_AUTH: 'CHECK_AUTH',
    LOGOUT: 'LOGOUT'
} as const;

export const NavigationActionsType = {
    NAVIGATE: 'NAVIGATE',
    UPDATE_PATH: 'UPDATE_PATH'
} as const;

export const NavigationActions = {
    navigate: (path: string) => {
        AppDispatcher.dispatch({
            type: NavigationActionsType.NAVIGATE,
            payload: path
        });
    },
    updatePath: (path: string) => {
        AppDispatcher.dispatch({
            type: NavigationActionsType.UPDATE_PATH,
            payload: path
        });
    }
}

export const GetDataActions = {
    getPosts: (data: PostType[]) => {
        AppDispatcher.dispatch({
            type: DataActionTypes.GET_POSTS,
            payload: data
        });
    },
    userPosts: (userId: string) => {
        AppDispatcher.dispatch({
            type: DataActionTypes.GET_USER_POSTS,
            payload: userId
        });
    } 
};

export const NewPostAction = {
    createPost: (postData: PostType) => {
        AppDispatcher.dispatch({
            type: NewPostTypes.NEW_POST,
            payload: postData
        });
    }
};

export const UserActions = {
    saveUser: (user: UserCredential) => {
        AppDispatcher.dispatch({
            type: UserActionsType.SAVE_USER,
            payload: user
        });
    },
    checkAuth: () => {
        AppDispatcher.dispatch({
            type: UserActionsType.CHECK_AUTH
        });
    },
    logout: () => {
        AppDispatcher.dispatch({
            type: UserActionsType.LOGOUT
        });
    }
};