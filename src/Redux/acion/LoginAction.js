import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = params => dispatch => {
  return new Promise((resolve, reject) => {
    FetchUtil({
      url: appendQueryParams(`/user/login`),
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
        if (res.msg.msg === "Login Successfully") {
          let abc = {
            name: res.msg.name,
            params
          }
          dispatch({ type: LOGIN, payload: abc });
        } else {
          dispatch({ type: LOGIN });
        }
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};


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
        if (res[0].msg === "Logout") {
          let key = "destroy";
          dispatch({ type: LOGOUT, payload: key });
        } else {
          dispatch({ type: LOGOUT });
        }
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};

export const userdelete = params => dispatch => {
  return new Promise((resolve, reject) => {
    FetchUtil({
      url: appendQueryParams(`/user/deleteuser`),
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
        dispatch({ type: LOGOUT });
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};

export const changepasswordafterlogin = params => dispatch => {
  return new Promise((resolve, reject) => {
    FetchUtil({
      url: appendQueryParams(`/user/changepasswordafterlogin`),
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
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};