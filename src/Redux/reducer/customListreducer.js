import {
    ADDCUSTOMLISTTEXT, CHECKTEXT
} from "../acion/customListAction";


const initialState = {
    customList: {
    }
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADDCUSTOMLISTTEXT:
            return {
                ...state,
                customList: action.payload
            };
        case CHECKTEXT:
            return {
                ...state,
                customList: action.payload
            };
        default:
            return state;
    }
};