import { Dispatch } from "react";
import { AppState } from "react-native";
import { ACTIONTYPE } from "./contexts/DataContext";

// eslint-disable-next-line max-len
export const asyncer = (dispatch: Dispatch<ACTIONTYPE>, state: any) => (action: any) => {
     typeof action === "function" ? action(dispatch, state) : dispatch(action);
};