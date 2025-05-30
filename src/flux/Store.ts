import { UserCredential } from 'firebase/auth';
import { User } from 'firebase/auth';
import { UserType } from '../utils/types/UserType';
import { auth } from '../services/Firebase/FirebaseConfig';
import { AppDispatcher, Action } from './Dispatcher';
import { PostType } from '../utils/types/PostType';
import { DataActionTypes, InteractionActionsType, LikeActionTypes, NavigationActionsType, NewPostTypes, UserActionsType, CommentLikeActionTypes } from './Actions';
import { LikeType } from '../utils/types/LikeType';
import { CommentLikeType } from '../utils/types/LikeCommentType';


export type State = {
    posts: PostType[];
    isAuthenticated: boolean | null;
    userAuthenticated: UserCredential | UserType | User | null;
    userProfile: UserType | null;
    currentPath: string;
    selectedProfile: string;
    likes: LikeType[];
    commentLikes: CommentLikeType[];
};

interface StoreListener {
    (state: State): void;
    interestedProperties?: string[];
}

type Listener = StoreListener;


class Store {
    private _myState: State = {
        posts: [],
        isAuthenticated: null,
        userAuthenticated: null,
        userProfile: null,
        currentPath: '',
        selectedProfile: '',
        likes: [],
        commentLikes: []
    }

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this)); // Bind the context of this method to the Store instance
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case NavigationActionsType.NAVIGATE:
                this._myState = {
                    ...this._myState,
                    currentPath: action.payload
                }
                window.history.pushState({}, '', action.payload);
                this._emitChange();
                this.persist();
                break;
            case NavigationActionsType.UPDATE_PATH:
                this._myState = {
                    ...this._myState,
                    currentPath: action.payload
                }
                this._emitChange();
                this.persist();
                break;
            case DataActionTypes.GET_POSTS:
                this._myState = {
                    ...this._myState,
                    posts: action.payload as PostType[],
                }
                this._emitChange();
                break;
            case NewPostTypes.NEW_POST:
                this._myState = {
                    ...this._myState,
                    posts: [action.payload as PostType, ...this._myState.posts]
                }
                this._emitChange();
                break;
            case LikeActionTypes.ADD_LIKE:
                this._myState = {
                    ...this._myState,
                    likes: [action.payload as LikeType, ...this._myState.likes]
                }
                this._emitChangeToListeners(['likes']);
                break;
            case LikeActionTypes.REMOVE_LIKE:
                this._myState = {
                    ...this._myState,
                    likes: this._myState.likes.filter(like => like.id !== action.payload.id)
                }
                this._emitChangeToListeners(['likes']);
                break;
            case CommentLikeActionTypes.ADD_COMMENT_LIKE:
                this._myState = {
                    ...this._myState,
                    commentLikes: [action.payload as CommentLikeType, ...this._myState.commentLikes]
                }
                this._emitChangeToListeners(['commentLikes']);
                break;
            case CommentLikeActionTypes.REMOVE_COMMENT_LIKE:
                this._myState = {
                    ...this._myState,
                    commentLikes: this._myState.commentLikes.filter(
                        like => !(like.postId === action.payload.postId && like.commentId === action.payload.commentId)
                    )
                }
                this._emitChangeToListeners(['commentLikes']);
                break;
            case UserActionsType.SAVE_USER:
                this._myState = {
                    ...this._myState,
                    isAuthenticated: true,
                    userAuthenticated: action.payload as UserCredential
                }
                this._emitChange();

                break;
            case UserActionsType.CHECK_AUTH:
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        this._myState = {
                            ...this._myState,
                            isAuthenticated: true,
                            userAuthenticated: user,
                        }
                    } else {
                        this._myState = {
                            ...this._myState,
                            isAuthenticated: false,
                            userAuthenticated: null
                        }
                    }
                    this._emitChange();
                });
                break;
            case UserActionsType.SET_CURRENT_USER:
                if (JSON.stringify(this._myState.userProfile) !== JSON.stringify(action.payload)) {
                    this._myState = {
                        ...this._myState,
                        userProfile: action.payload as UserType,
                        isAuthenticated: true
                    };
                    this._emitChange();
                    this.persist();
                }
                break;
            case UserActionsType.NEW_NAME:
                this._myState = {
                    ...this._myState,
                    userProfile: {
                        ...this._myState.userProfile as UserType,
                        name: action.payload,
                    }
                };
                this._emitChange();
                break;
            case InteractionActionsType.SET_PROFILE_ID:
                this._myState = {
                    ...this._myState,
                    selectedProfile: action.payload
                }
                this._emitChange();
                this.persist();
            break;
            case UserActionsType.LOGOUT:
                auth.signOut().then(() => {
                    this._myState = {
                        ...this._myState,
                        currentPath: '/',
                        isAuthenticated: false,
                        userProfile: null,
                        posts: [],
                        selectedProfile: ''

                    }
                    this._emitChange();
                    this.persist()
                }).catch((error) => {
                    console.error('Error al cerrar sesión:', error);
                });
            break;

        }

    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    private _emitChangeToListeners(properties: string[]): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            if (listener.interestedProperties) {
                if (listener.interestedProperties.some(prop => properties.includes(prop))) {
                    listener(state);
                }
            } else {
                if (!properties.includes('likes')) {
                    listener(state);
                }
            }
        }
    }

    subscribe(listener: Listener, interestedProperties?: string[]): void {
        if (interestedProperties) {
            listener.interestedProperties = interestedProperties;
        }
        this._listeners.push(listener);
        listener(this.getState());
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }

    persist(): void {
        const { userProfile, isAuthenticated, currentPath, selectedProfile, posts } = this._myState;
        const persistedState = { userProfile, isAuthenticated, currentPath, selectedProfile, posts };
        localStorage.setItem('flux:state', JSON.stringify(persistedState));
    }

    load(): void {
        const persistedState = localStorage.getItem('flux:state');
        if (persistedState) {
            const parsed = JSON.parse(persistedState);
            this._myState = {
                ...this._myState, // default state
                ...parsed         // overrides only allowed parts
            };
            this._emitChange();
        }
    }
}

export const store = new Store();