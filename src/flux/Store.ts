import { UserCredential } from 'firebase/auth';
import { User } from 'firebase/auth';
import { UserType } from '../utils/types/UserType';
import { auth } from '../services/Firebase/FirebaseConfig';
import { AppDispatcher, Action } from './Dispatcher';
import { PostType } from '../utils/types/PostType';
import { DataActionTypes, NavigationActionsType, NewPostTypes, UserActionsType } from './Actions';


export type State = {
    posts: PostType[];
    isAuthenticated: boolean;
    userAuthenticated: UserCredential | UserType | User | null;
    currentPath: string;
};

type Listener = (state: State) => void;


class Store {
    private _myState: State = {
        posts: [],
        isAuthenticated: false,
        userAuthenticated: null,
        currentPath: ""
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
                        posts: action.payload,
                    }   
                this._emitChange();
            break;
            case NewPostTypes.NEW_POST:
                    this._myState = {
                        ...this._myState,
                        posts: [...this._myState.posts, action.payload]
                    }   
                this._emitChange();
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
        }
    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState());
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
}

export const store=new Store();