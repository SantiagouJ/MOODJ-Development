import { LikeType } from '../utils/types/LikeType';
import { PostType } from '../utils/types/PostType';
import { UserType } from '../utils/types/UserType';
import { AppDispatcher } from './Dispatcher';
import { UserCredential } from "firebase/auth";
import { CommentLikeType } from '../utils/types/LikeCommentType';

export const DataActionTypes = {
    GET_POSTS:'GET_POSTS',
    GET_USER_POSTS: 'GET_USER_POSTS'
} as const;

export const NewPostTypes = {
    NEW_POST: 'NEW_POST'
} as const;

export const LikeActionTypes = {
    ADD_LIKE: 'ADD_LIKE',
    REMOVE_LIKE: 'REMOVE_LIKE'
} as const;

export const CommentLikeActionTypes = {
    ADD_COMMENT_LIKE: 'ADD_COMMENT_LIKE',
    REMOVE_COMMENT_LIKE: 'REMOVE_COMMENT_LIKE'
} as const;

export const UserActionsType = {
    SAVE_USER: 'SAVE_USER',
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    CHECK_AUTH: 'CHECK_AUTH',
    LOGOUT: 'LOGOUT',
    NEW_NAME: 'NEW_NAME'
} as const;

export const NavigationActionsType = {
    NAVIGATE: 'NAVIGATE',
    UPDATE_PATH: 'UPDATE_PATH'
} as const;

export const InteractionActionsType = {
    SET_PROFILE_ID: 'SET_PROFILE_ID'
} as const

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

export const LikeActions = {
    addLike: (likeData: LikeType) => {
        AppDispatcher.dispatch({
            type: LikeActionTypes.ADD_LIKE,
            payload: likeData
        });
    },
    removeLike: (likeData: LikeType) => {
        AppDispatcher.dispatch({
            type: LikeActionTypes.REMOVE_LIKE,
            payload: likeData
        });
    }
}

export const CommentLikeActions = {
    addCommentLike: (likeData: CommentLikeType) => {
        AppDispatcher.dispatch({
            type: CommentLikeActionTypes.ADD_COMMENT_LIKE,
            payload: likeData
        });
    },
    removeCommentLike: (likeData: CommentLikeType) => {
        AppDispatcher.dispatch({
            type: CommentLikeActionTypes.REMOVE_COMMENT_LIKE,
            payload: likeData
        });
    }
}

export const UserActions = {
    saveUser: (user: UserCredential) => {
        AppDispatcher.dispatch({
            type: UserActionsType.SAVE_USER,
            payload: user
        });
    },
    setUser: (profile: UserType) => {
        AppDispatcher.dispatch({
            type: UserActionsType.SET_CURRENT_USER,
            payload: profile
        })
    },
    updateName: (newName: string) => {
        AppDispatcher.dispatch({
            type: UserActionsType.NEW_NAME,
            payload: newName
        })
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

export const InteractionActions = {
    setProfileId: (userId: string) => {
        AppDispatcher.dispatch({
            type: InteractionActionsType.SET_PROFILE_ID,
            payload: userId
        })
    }
}