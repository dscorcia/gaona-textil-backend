import { types } from '../types/types';

const initialState = {
    clientes: [{
        _id: "",
        idRegistro: "",
        cuit: "",
        razonSocial: "",
        nombre: "",
        telefono: ""
    }],
    activeCliente: null
    
};

export const clientesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.clienteLoaded:
            return {
                ...state,
                clientes: [ ...action.payload ]
            }
        
        case types.clienteSetActive:
            return {
                ...state,
                activeCliente: action.payload
            }
            
        case types.clienteAddNew:
            return {
                ...state,
                clientes: [
                    ...state.clientes,
                    action.payload
                ]
            }
        
        case types.clienteClearActiveCliente:
            return {
                ...state,
                activeCliente: null
            }
    
        case types.clienteUpdated:
            return {
                ...state,
                clientes: state.clientes.map(
                    e => ( e.idRegistro === action.payload.idRegistro ) ? action.payload : e
                )
            }
        
        case types.clienteDeleted:
            return {
                ...state,
                clientes: state.clientes.filter(
                    e => ( e.idRegistro !== state.activeCliente.idRegistro )
                ),
                activeCliente: null

                }
        
        default:
            return state;
    }

}