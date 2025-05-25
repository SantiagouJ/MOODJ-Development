import { State } from "./Store";
import { DataActionTypes } from "./Actions";
import { Post } from "../adapters/adaptData";

export type Action =
  | { type: typeof DataActionTypes.GET_POSTS; payload: Post[] }
  | { type: string; payload?: any }; // fallback or other actions


export class Dispatcher {
    private _listeners: Array<(action: Action) => void>;

    constructor() {
        this._listeners = [];
    }

    register(callback: (action: Action) => void): void {
        this._listeners.push(callback);
    }

    dispatch(action: Action): void {
        for (const listener of this._listeners) {
            listener(action);
        }
    }
}

export const AppDispatcher = new Dispatcher();