import { types } from '../types/types';

const initialState = {
    solicitudes: [{
        nroSolicitudTintoreria: "",
        nroPartida: "",
        remitoHilanderia: [],
        fecha: new Date().getTime(),
        articulos: [{}],
    }],
    activeSol: null,
    solicitud: {
        nroSolicitudTintoreria: "",
        nroPartida: "",
        remitoHilanderia: [],
        articulos: [{}],
    }
    
};

export const solicitudTintoreriaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.solTLoaded:
            return {
                ...state,
                solicitudes: [ ...action.payload ]
            }
        
        case types.solTLoadedOne:
            return {
                ...state,
                solicitud: action.payload
            }
        
        case types.solTSetActive:
            return {
                ...state,
                activeSol: action.payload
            }
            
        case types.solTAddNew:
            return {
                ...state,
                solicitudes: [
                    ...state.solicitudes,
                    action.payload
                ]
            }
        
        case types.solTClearActiveSol:
            return {
                ...state,
                activeSol: null
            }
    
        case types.solTUpdated:
            return {
                ...state,
                solicitudes: state.solicitudes.map(
                    e => ( e.nroSolicitudTintoreria === action.payload.nroSolicitudTintoreria ) ? action.payload : e
                )
            }
        
        case types.solTDeleted:
            return {
                ...state,
                solicitudes: state.solicitudes.filter(
                    e => ( e.nroSolicitudTintoreria !== state.activeSol.nroSolicitudTintoreria )
                ),
                activeSol: null

                }
        
        default:
            return state;
    }

}