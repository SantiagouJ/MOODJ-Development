import { AppDispatcher, Action } from './Dispatcher';
import { PostType } from '../utils/types/PostType';
import { DataActionTypes } from './Actions';

export type User = {
    name: string;
    age: number;
}

export type State = {
    posts: PostType[];
};

type Listener = (state: State) => void;


class Store {
    private _myState: State = {
        posts: []
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
            case DataActionTypes.GET_POSTS:
                    this._myState = {
                        ...this._myState,
                        posts: action.payload,
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

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState());
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
}

export const store = new Store();