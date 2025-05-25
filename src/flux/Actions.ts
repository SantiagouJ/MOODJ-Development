import { PostType } from '../utils/types/PostType';
import { AppDispatcher } from './Dispatcher';
import { State } from './Store';

export const DataActionTypes = {
    GET_POSTS:'GET_POSTS',
    GET_USER_POSTS: 'GET_USER_POSTS'
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