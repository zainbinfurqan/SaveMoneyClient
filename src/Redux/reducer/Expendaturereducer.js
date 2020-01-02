import {
  ADDEXPENDATURE,
  DELETEEXPENDATURE
} from "../acion/ExpendatureAction.js";

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDEXPENDATURE:
      return {
        ...state
      };
    case DELETEEXPENDATURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
