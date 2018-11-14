import { User } from "./user";
import { Action } from "@ngrx/store";

export const UserActionTypes = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_ERROR: "USER_LOGIN_ERROR",
  USER_LOGIN_INFORMATION: "USER_LOGIN_INFORMATION",
  USER_LIRE: "USER_LIRE",
  USER_FETCH_ERROR: "USER_FETCH_ERROR",
  USER_INSCRIPTION: "USER_INSCRIPTION",
  USER_INSCRIPTION_ERROR: "USER_INSCRIPTION_ERROR",
  USER_INSCRIPTION_SUCCESS:"USER_INSCRIPTION_SUCCESS"
};

export interface UserState {
  loading: boolean;
  error: boolean;
  user: User;
  message: string;
  token: string;
  avatar:string;
}

const initialState: UserState = {
  loading: false,
  error: false,
  user: null,
  message: null,
  token: null,
  avatar:null
};

export class UserAction implements Action {
  type = UserActionTypes.USER_LOGIN;
  token;
  message;
  user: User;
  constructor(public email: string, public password: string) {}
}

export class UserInformationAction implements Action {
  type = UserActionTypes.USER_LIRE;
  token;
  message;
  loading: false;
  user: User;
  constructor(public tokenUser: string) {}
}
export class UserInscriptionAction implements Action {
  type = UserActionTypes.USER_INSCRIPTION;
  message;
  constructor(public name: string,public password: string) {}
}

export function userReducer(state: any = initialState, action: UserAction) {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN:
      return { ...state, loading: true,error:false };

    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
        message: action.message
      };

    case UserActionTypes.USER_LOGIN_ERROR:
      return { ...state, loading: false, error: true };
    case UserActionTypes.USER_LIRE:
      return { ...state, loading: true };
    case UserActionTypes.USER_LOGIN_INFORMATION:
      return { ...state, loading: false, error: false, user: action.user };
    case UserActionTypes.USER_FETCH_ERROR:
      return { ...state, loading: false, error: true };
    case UserActionTypes.USER_INSCRIPTION:
      return { ...state, message: action.message, error: false };
    case UserActionTypes.USER_INSCRIPTION_ERROR:
      return { ...state, message: action.message, error: true };
    case UserActionTypes.USER_INSCRIPTION_SUCCESS:
      return { ...state, error: false };
    default:
      return state;
  }
}
