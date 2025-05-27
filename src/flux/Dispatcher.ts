import { DataActionTypes, NavigationActionsType, UserActionsType } from "./Actions";
import { NewPostTypes } from "./Actions";
import { PostType } from "../utils/types/PostType";
import { UserCredential } from "firebase/auth";

export type Action =
  | { type: typeof DataActionTypes.GET_POSTS; payload: PostType[] }
  | { type: typeof NewPostTypes.NEW_POST; payload: PostType}
  | { type: typeof UserActionsType.CHECK_AUTH }
  | { type: typeof UserActionsType.SAVE_USER; payload: UserCredential }
  | { type: typeof UserActionsType.LOGOUT }
  | { type: typeof DataActionTypes.GET_USER_POSTS; payload: string }
  | { type: typeof NavigationActionsType.NAVIGATE; payload: string }
  | { type: typeof NavigationActionsType.UPDATE_PATH; payload: string };


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