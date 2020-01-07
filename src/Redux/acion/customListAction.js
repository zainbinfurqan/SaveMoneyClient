export const ADDCUSTOMLISTTEXT = "ADDCUSTOMLISTTEXT";
export const CHECKTEXT = "CHECKTEXT";


export const addtext = params => dispatch => {
    dispatch({ type: ADDCUSTOMLISTTEXT, payload: params });
}
export const checktext = params => dispatch => {
    dispatch({ type: CHECKTEXT, payload: params });
}