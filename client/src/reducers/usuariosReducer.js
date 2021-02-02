import { types } from '../types/types';

const initialState = {
    usuarios: [{
        name: "Eve",
        nombre: "Evelin",
        apellido: "Santamaria",
        dni: 38615448,
        password: '#fafafa',
        perfil: "admin",
    }],
    activeUsuario: null
    
};

export const usuariosReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.usuarioLoaded:
            return {
                ...state,
                usuarios: [ ...action.payload ]
            }
        
        case types.usuarioSetActive:
            return {
                ...state,
                activeUsuario: action.payload
            }
            
        case types.usuarioAddNew:
            return {
                ...state,
                usuarios: [
                    ...state.usuarios,
                    action.payload
                ]
            }
        
        case types.usuarioClearActiveUsuario:
            return {
                ...state,
                activeUsuario: null
            }
    
        case types.usuarioUpdated:
            return {
                ...state,
                usuarios: state.usuarios.map(
                    e => ( e.name === action.payload.name ) ? action.payload : e
                )
            }
        
        case types.usuariosDeleted:
            return {
                ...state,
                usuarios: state.usuarios.filter(
                    e => ( e.name !== state.activeUsuario.name )
                ),
                activeUsuario: null

                }
        
        default:
            return state;
    }

}
