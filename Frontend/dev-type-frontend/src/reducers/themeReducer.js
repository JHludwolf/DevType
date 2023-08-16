import { CHANGE_THEME } from "../actions/actionTypes";
import themes from "../resources/themes.json";

const initialState = {
    name: "nordic",
    colors: themes["nordic"],

};

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                name: action.payload,
                colors: themes[action.payload]
            };
        default:
            return state;
    }
}

export default themeReducer;