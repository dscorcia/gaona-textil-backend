import { types } from '../types/types';

const initialState = {
    stock: [{
        idArticulo: "",
        descripcion: "",
        color: "",
        cantidadKgsNegocio: "",
        cantidadPiezasNegocio: "",
        cantidadKgsTintoreria: "",
        cantidadPiezasTintoreria: "",
        costo: "",
        subtotalCosto: "",
        fabrica_tintoreria: "",
        empresa: "",
    }],
    activeStock: null,
    articulo: {
        idArticulo: "",
        descripcion: "",
        color: "",
        cantidadKgsNegocio: "",
        cantidadPiezasNegocio: "",
        cantidadKgsTintoreria: "",
        cantidadPiezasTintoreria: "",
        costo: "",
        subtotalCosto: "",
        fabrica_tintoreria: "",
        empresa: "",
    }
};

export const stockReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.stockLoaded:
            return {
                ...state,
                stock: [ ...action.payload ]
            }
        
        case types.stockLoadedOne:
            return {
                ...state,
                articulo: action.payload
            }
        
        case types.stockSetActive:
            return {
                ...state,
                activeStock: action.payload
            }
            
        case types.stockAddNew:
            return {
                ...state,
                stock: [
                    ...state.stock,
                    action.payload
                ]
            }
        
        case types.stockClearActiveStock:
            return {
                ...state,
                activeStock: null
            }
    
        case types.stockUpdated:
            return {
                ...state,
                stock: state.stock.map(
                    e => ( e.idArticulo === action.payload.idArticulo ) ? action.payload : e
                )
            }
        
        case types.stockDeleted:
            return {
                ...state,
                stock: state.stock.filter(
                    e => ( e.idArticulo !== state.activeStock.idArticulo )
                ),
                activeStock: null

                }
        
        default:
            return state;
    }

}
