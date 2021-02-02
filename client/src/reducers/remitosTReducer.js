import { types } from '../types/types';

const initialState = {
    remitos: [{
        nroRemitoTintoreria: "",
        nroPartida: "",
        remitoHilanderia: [],
        fecha: new Date().getTime(),
        articulos: [{}],
    }],
    activeRemito: null,
    remito: {
        nroRemitoTintoreria: "",
        nroPartida: "",
        remitoHilanderia: [],
        articulos: [{}],
    }
    
};

export const remitosTReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.remitoTLoaded:
            return {
                ...state,
                remitos: [ ...action.payload ]
            }
        
        case types.remitoTLoadedOne:
            return {
                ...state,
                remito: action.payload
            }
        
        case types.remitoTSetActive:
            return {
                ...state,
                activeRemito: action.payload
            }
            
        case types.remitoTAddNew:
            return {
                ...state,
                remitos: [
                    ...state.remitos,
                    action.payload
                ]
            }
        
        case types.remitoTClearActiveRemito:
            return {
                ...state,
                activeRemito: null
            }
    
        case types.remitoTUpdated:
            return {
                ...state,
                remitos: state.remitos.map(
                    e => ( e.nroRemitoTintoreria === action.payload.nroRemitoTintoreria ) ? action.payload : e
                )
            }
        
        case types.remitoTDeleted:
            return {
                ...state,
                remito: state.remitos.filter(
                    e => ( e.nroRemitoTintoreria !== state.activeRemito.nroRemitoTintoreria )
                ),
                activeRemito: null

                }
        
        default:
            return state;
    }

}