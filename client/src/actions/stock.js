import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const stockAddNew = (stock) => ({
    type: types.stockAddNew,
    payload: stock
});

export const stockSetActive = (stock) => ({
    type: types.stockSetActive,
    payload: stock
});

export const stockClearActiveStock = () => ({ type: types.stockClearActiveStock });

export const stockUpdated = ( stock ) => ({
    type: types.stockUpdated,
    payload: stock
});

export const stockDeleted = () => ({ 
    type: types.stockDeleted
 });

 const stockLoaded = (stock) => ({
    type: types.stockLoaded,
    payload: stock
});

const stockLoadedOne = (stock) => ({
    type: types.stockLoadedOne,
    payload: stock
});

export const stockStartLoading = () => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( 'stock/stock' );
            const body = await resp.json();

            const stock = body.stock;
            console.log(stock);
            dispatch (stockLoaded(stock))

        }catch (error){
            console.log(error)
        }
    }
}

export const stockStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { idArticulo, color } = getState().stock.activeStock;
        try {
            const resp = await fetchConToken(`stock/delete/${ idArticulo }/${color}`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( stockDeleted() );
                Swal.fire(`Stock de artículo ${idArticulo} - ${color} Eliminado`, body.msg, 'success');
                setInterval(function(){ window.location.reload(); }, 2000);
                
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const stockStartAddNew = ( stock ) => {
    return async( dispatch, getState ) => {

        console.log(stock);

        try {
            const resp = await fetchConToken('stock/new', stock, 'POST');
            const body = await resp.json();
            
            if ( body.ok ) {
                dispatch( stockAddNew( stock ) );
                Swal.fire(`Stock cargado con exito!`, '', 'success');
                //setInterval(function(){ window.location.reload(); }, 1000);
                dispatch( stockStartLoading());
            }
            else {
            Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const stockStartUpdate = ( stock ) => {

    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`stock/modify/${ stock.idArticulo }/${stock.color}`, stock, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( stockUpdated( stock ) );
                Swal.fire(`Stock de artículo ${stock.idArticulo} - ${stock.color} modificado con exito!`, '', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }
    }
}


export const stockGetOne = ( id, color ) => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( `stock/stock/${ id }/${color}`);
            const body = await resp.json();
            const stock = body.stockUnico;
            dispatch (stockLoadedOne(stock));

        }catch (error){
            console.log(error)
        }
    }
}

