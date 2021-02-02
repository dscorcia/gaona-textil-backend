import { types } from '../types/types';

const initialState = {
    remitos: [{
        remitoHilanderia: "",
        fecha: new Date().getTime(),
        nroFactura: "",
        articulos: [{}],
    }],
    activeRemito: null,
    remito: {
        remitoHilanderia: "",
        nroFactura: "",
        articulos: [{}],
    }
    
};

export const remitosHReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.remitoHLoaded:
            return {
                ...state,
                remitos: [ ...action.payload ]
            }
        
        case types.remitoHLoadedOne:
            return {
                ...state,
                remito: action.payload
            }
        
        case types.remitoHSetActive:
            return {
                ...state,
                activeRemito: action.payload
            }
            
        case types.remitoHAddNew:
            return {
                ...state,
                remitos: [
                    ...state.remitos,
                    action.payload
                ]
            }
        
        case types.remitoHClearActiveRemito:
            return {
                ...state,
                activeRemito: null
            }
    
        case types.remitoHUpdated:
            return {
                ...state,
                remitos: state.remitos.map(
                    e => ( e.remitoHilanderia === action.payload.remitoHilanderia ) ? action.payload : e
                )
            }
        
        case types.remitoHDeleted:
            return {
                ...state,
                remito: state.remitos.filter(
                    e => ( e.remitoHilanderia !== state.activeRemito.remitoHilanderia )
                ),
                activeRemito: null

                }
        
        default:
            return state;
    }

}