import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";

export const LOGOUT = "LOGOUT";

export const logout = params => dispatch => {
    return new Promise((resolve, reject) => {
      FetchUtil({
        url: appendQueryParams(`/user/logout?LoginKey=${params.loginKey}`),
        method: "POST",
        body: JSON.stringify({
          params
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          resolve(res);
          if(res[0].msg === "Logout"){
              let key = "destroy";
              dispatch({ type: LOGOUT ,payload: key });
          }else{
          dispatch({ type: LOGOUT });
          }
        })
        .catch(err => {
          reject({ message: err });
        });
    });
  };