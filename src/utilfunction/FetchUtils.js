import Config from "../config";
import { HandleFetchError } from "./ErrorHandlerUtils";

export const FetchUtil = data => {
  const { url, method = "GET", token = null, body = null } = data;
  let headers = { "Content-Type": "application/json" };
  if (token) {
    headers = { ...headers, Authorization: token };
  }
  return fetch(`${Config.env().API_URL}${url}`, {
    method,
    headers,
    body
    // credentials: "include"
  }).then(HandleFetchError);
};