import { UserCredential } from 'firebase/auth';
import { User } from 'firebase/auth';
import { UserType } from '../utils/types/UserType';
import { auth } from '../services/Firebase/FirebaseConfig';
import { AppDispatcher, Action } from './Dispatcher';
import { PostType } from '../utils/types/PostType';
import { DataActionTypes, InteractionActionsType, LikeActionTypes, NavigationActionsType, NewPostTypes, UserActionsType, PersistActionTypes } from './Actions';
import { LikeType } from '../utils/types/LikeType';


export type State = {
    posts: PostType[];
    isAuthenticated: boolean | null;
    userAuthenticated: UserCredential | UserType | User | null;
    userProfile: UserType | null;
    currentPath: string;
    selectedProfile: string;
    likes: LikeType[];
    navigation: string;
    user: UserType | null;
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
        navigation: '',
        user: null
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
            case PersistActionTypes.PERSIST_USER:
                this._myState = {
                    ...this._myState,
                    user: action.payload as UserType
                }
                this._emitChange();
                break;
            case PersistActionTypes.PERSIST_NAVIGATION:
                this._myState = {
                    ...this._myState,
                    navigation: action.payload as string
                }
                this._emitChange();
                break;
            case NavigationActionsType.NAVIGATE:
                this._myState = {
                    ...this._myState,
                    currentPath: action.payload
                }
                window.history.pushState({}, '', action.payload);
                this._emitChange();
                break;
            case NavigationActionsType.UPDATE_PATH:
                this._myState = {
                    ...this._myState,
                    currentPath: action.payload
                }
                this._emitChange();
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
}

export const store=new Store();