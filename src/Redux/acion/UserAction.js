import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";

export const USERDELETE = "USERDELETE";
export const LOGOUT = "LOGOUT";

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
  