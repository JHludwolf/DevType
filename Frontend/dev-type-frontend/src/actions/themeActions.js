import { CHANGE_THEME } from "./actionTypes";

export const changeTheme = (theme) => {
    return {
        type: CHANGE_THEME,
        payload: theme,
    };
};