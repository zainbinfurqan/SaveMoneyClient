import { combineReducers } from "redux";
import loginreducer from './Loginreducer.js'
import logoutreducer from './Logoutreducer.js'
import customlist from './customListreducer'
// import RoleReducers from "./RoleReducers";
// import UserRolePrivellegeReducers from "./UserRolePrivellegeReducers";
// import loginreducer from "./loginreducer";
// import registrationreducer from "./registrationreducer.js";
// import roledata from "./registrationreducer.js";
// import classsectionreducer from './classsectionreducer.js';

export default combineReducers({
    authData :loginreducer,logoutreducer,
    customlist: customlist
    // authData :logoutreducer
    
//   rolesData: RoleReducers,/*Muhammad Arshaq */
//   userRoles: UserRolePrivellegeReducers, /*zain ahmed */

//   smsData: loginreducer, /*zain ahmed */
//   registrationreducer, /*zain ahmed */
//   roledata
});
