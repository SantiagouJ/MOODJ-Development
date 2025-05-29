import { DataActionTypes, InteractionActionsType, NavigationActionsType, UserActionsType, LikeActionTypes, PersistActionTypes } from "./Actions";
import { NewPostTypes } from "./Actions";
import { PostType } from "../utils/types/PostType";
import { UserCredential } from "firebase/auth";
import { UserType } from "../utils/types/UserType";
import { LikeType } from "../utils/types/LikeType";

export type Action =
  | { type: typeof DataActionTypes.GET_POSTS; payload: PostType[] }
  | { type: typeof NewPostTypes.NEW_POST; payload: PostType}
  | { type: typeof UserActionsType.CHECK_AUTH }
  | { type: typeof UserActionsType.SAVE_USER; payload: UserCredential }
  | { type: typeof UserActionsType.SET_CURRENT_USER; payload: UserType }
  | { type: typeof UserActionsType.NEW_NAME; payload: string }
  | { type: typeof UserActionsType.LOGOUT }
  | { type: typeof DataActionTypes.GET_USER_POSTS; payload: string }
  | { type: typeof NavigationActionsType.NAVIGATE; payload: string }
  | { type: typeof NavigationActionsType.UPDATE_PATH; payload: string }
  | { type: typeof InteractionActionsType.SET_PROFILE_ID; payload: string }
  | { type: typeof LikeActionTypes.ADD_LIKE; payload: LikeType }
  | { type: typeof LikeActionTypes.REMOVE_LIKE; payload: LikeType }
  | { type: typeof PersistActionTypes.PERSIST_USER; payload: UserType }
  | { type: typeof PersistActionTypes.PERSIST_NAVIGATION; payload: string };

  


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