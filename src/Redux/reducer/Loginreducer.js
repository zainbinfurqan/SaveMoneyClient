import { LOGIN, LOGOUT } from "../acion/LoginAction.js";

const initialState = {
  Auth: {
    userName:'',
    LoginKey: "",
    Email: "",
    LoginKeyFlag: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        Auth: {
          userName:action.payload.name,
          LoginKey: action.payload.params.loginKey_,
          Email: action.payload.params.email,
          LoginKeyFlag: true
        }
      };
    case LOGOUT:
      return {
        // ...state,
        Auth: { LoginKey: "", Email: "", LoginKeyFlag: false }
      };

    default:
      return state;
  }
};
