import { types } from "../types/types";

const initialState = {

    checking: true
    // uid: null,
    // name:null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                checking:false,
                uid: action.payload.uid,
                name:action.payload.name
            }
        case types.authCheckingFinish:
            return{
                checking:false,
                ...state
            }

        case types.authLogout:
            return{
                checking:false
            }



        default:
            return state;
    }
}