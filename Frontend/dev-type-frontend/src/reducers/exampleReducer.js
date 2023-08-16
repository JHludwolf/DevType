import { EXAMPLE_ACTION } from "../actions/actionTypes";

const initialState = {
  data: null,
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default exampleReducer;
