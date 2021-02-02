import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';

/** REMITOS HILANDERIA */

export const remitoHAddNew = (remito) => ({
    type: types.remitoHAddNew,
    payload: remito
});

export const remitoHSetActive = (remito) => ({
    type: types.remitoHSetActive,
    payload: remito
});

export const remitoHClearActiveRemito = () => ({ type: types.remitoHClearActiveRemito });

export const remitoHUpdated = ( remito ) => ({
    type: types.remitoHUpdated,
    payload: remito
});

export const remitoHDeleted = () => ({ 
    type: types.remitoHDeleted
 });

 const remitoHLoaded = (remito) => ({
    type: types.remitoHLoaded,
    payload: remito
});

const remitoHLoadedOne = (remito) => ({
    type: types.remitoHLoadedOne,
    payload: remito
});


export const remitoHStartLoading = () => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( 'remitoHilanderia/remitos' );
            const body = await resp.json();
            console.log(body);

            const remitos = body.remitosHilanderia;
            console.log(remitos);
            dispatch (remitoHLoaded(remitos))

        }catch (error){
            console.log(error)
        }
    }
}

export const remitoHStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { remitoHilanderia} = getState().remitosH.activeRemito;
        try {
            const resp = await fetchConToken(`remitoHilanderia/delete/${ remitoHilanderia }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( remitoHDeleted() );
                Swal.fire(`Remito ${remitoHilanderia} Eliminado`, body.msg, 'success');
                setInterval(function(){ window.location.reload(); }, 2000);
                
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const remitoHStartAddNew = ( remito ) => {
    return async( dispatch, getState ) => {

        try {
            const resp = await fetchConToken('remitoHilanderia/new', remito, 'POST');
            const body = await resp.json();
            
            if ( body.ok ) {
                dispatch( remitoHAddNew( remito) );
                Swal.fire(`Remito creado con exito!`, '', 'success');
                //setInterval(function(){ window.location.reload(); }, 1000);
                dispatch( remitoHStartLoading());
            }
            else {
            Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const remitoHStartUpdate = ( remito ) => {

    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`remitoHilanderia/modify/${ remito.remitoHilanderia }`, remito, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( remitoHUpdated( remito ) );
                Swal.fire(`Remito modificado con exito!`, '', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const remitoHGetOne = ( id ) => {

    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( `remitoHilanderia/remitoUnico/${ id }`);
            const body = await resp.json();
            const remito = body.remitosHilanderia;
            console.log(remito);
            dispatch (remitoHLoadedOne(remito));

        }catch (error){
            console.log(error)
        }
    }
}

/** REMITOS TINTORERIA */

export const remitoTAddNew = (remito) => ({
    type: types.remitoTAddNew,
    payload: remito
});

export const remitoTSetActive = (remito) => ({
    type: types.remitoTSetActive,
    payload: remito
});

export const remitoTClearActiveRemito = () => ({ type: types.remitoTClearActiveRemito });

export const remitoTUpdated = ( remito ) => ({
    type: types.remitoTUpdated,
    payload: remito
});

export const remitoTDeleted = () => ({ 
    type: types.remitoTDeleted
 });

 const remitoTLoaded = (remito) => ({
    type: types.remitoTLoaded,
    payload: remito
});

const remitoTLoadedOne = (remito) => ({
    type: types.remitoTLoadedOne,
    payload: remito
});


export const remitoTStartLoading = () => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( 'remitoTintoreria/remitos' );
            const body = await resp.json();
            console.log(body);

            const remitos = body.nroRemitoTintoreria;
            console.log(remitos);
            dispatch (remitoTLoaded(remitos))

        }catch (error){
            console.log(error)
        }
    }
}

export const remitoTStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { nroRemitoTintoreria} = getState().remitosT.activeRemito;
        try {
            const resp = await fetchConToken(`remitoTintoreria/delete/${ nroRemitoTintoreria }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( remitoTDeleted() );
                Swal.fire(`Remito ${nroRemitoTintoreria} Eliminado`, body.msg, 'success');
                setInterval(function(){ window.location.reload(); }, 2000);
                
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const remitoTStartAddNew = ( remito ) => {
    return async( dispatch, getState ) => {

        try {
            const resp = await fetchConToken('remitoTintoreria/new', remito, 'POST');
            const body = await resp.json();
            
            if ( body.ok ) {
                dispatch( remitoTAddNew( remito) );
                Swal.fire(`Remito creado con exito!`, '', 'success');
                //setInterval(function(){ window.location.reload(); }, 1000);
                dispatch( remitoTStartLoading());
            }
            else {
            Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const remitoTStartUpdate = ( remito ) => {

    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`remitoTintoreria/modify/${ remito.nroRemitoTintoreria }`, remito, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( remitoTUpdated( remito ) );
                Swal.fire(`Remito modificado con exito!`, '', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const remitoTGetOne = ( id ) => {

    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( `remitoTintoreria/remitoUnico/${ id }`);
            const body = await resp.json();
            const remito = body.remitosTintoreria;
            console.log(remito);
            dispatch (remitoTLoadedOne(remito));

        }catch (error){
            console.log(error)
        }
    }
}