import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";

export const ADDEXPENDATURE = "ADDEXPENDATURE";
export const DELETEEXPENDATURE = "DELETEEXPENDATURE";
export const SELECTEDMONTHSTATUS = "SELECTEDMONTHSTATUS";
export const addexpendature = params => dispatch => {
  return new Promise((resolve, reject) => {
    FetchUtil({
      url: appendQueryParams(`/user/addexpendature`),
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
        dispatch({ type: ADDEXPENDATURE });
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};

export const deleteexpendature = params => dispatch => {
  return new Promise((resolve, reject) => {
    FetchUtil({
      url: appendQueryParams(`/user/deleteexpendature`),
      method: "DELETE",
      body: JSON.stringify({
        params
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        resolve(res);
        dispatch({ type: DELETEEXPENDATURE });
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};

export const getselectedmonthstatus = params => dispatch => {
  return new Promise((resolve, reject) => {
    FetchUtil({
      url: appendQueryParams(
        `/user/selectedmonthstatus?selectMonth=${params.month}&loginKey=${params.loginKey}&email=${params.Email}`
      ),
      method: "GET"
    })
      .then(res => {
        resolve(res);
        dispatch({ type: SELECTEDMONTHSTATUS });
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};
