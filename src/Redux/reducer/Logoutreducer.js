import { LOGOUT } from "../acion/LogoutAction.js";

const initialState = {
 
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
      };

    default:
      return state;
  }
};
