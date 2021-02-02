import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalPassOpen: false
}



export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiOpenPassModal:
            return {
                ...state,
                modalPassOpen: true
            }

        case types.uiClosePassModal:
            return {
                ...state,
                modalPassOpen: false
            }
            case types.uiOpenModalArt:
                return {
                    ...state,
                    modalArtOpen: true
                }
    
            case types.uiCloseModalArt:
                return {
                    ...state,
                    modalArtOpen: false
                }
    
        default:
            return state;
    }


}