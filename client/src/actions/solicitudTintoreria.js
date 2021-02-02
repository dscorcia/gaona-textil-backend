import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';

/** SOLICITUD TINTORERIA */

export const solTAddNew = (solicitud) => ({
    type: types.solTAddNew,
    payload: solicitud
});

export const solTSetActive = (solicitud) => ({
    type: types.solTSetActive,
    payload: solicitud
});

export const solTClearActiveSol = () => ({ type: types.solTClearActiveSol });

export const solTUpdated = ( solicitud ) => ({
    type: types.solTUpdated,
    payload: solicitud
});

export const solTDeleted = () => ({ 
    type: types.solTDeleted
 });

 const solTLoaded = (solicitud) => ({
    type: types.solTLoaded,
    payload: solicitud
});

const solTLoadedOne = (solicitud) => ({
    type: types.solTLoadedOne,
    payload: solicitud
});


export const solTStartLoading = () => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( 'solicitudTintoreria/solicitud' );
            const body = await resp.json();
            console.log(body);

            const solicitudes = body.nroSolicitudTintoreria;
            console.log(solicitudes);
            dispatch (solTLoaded(solicitudes))

        }catch (error){
            console.log(error)
        }
    }
}

export const solTStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { nroSolicitudTintoreria} = getState().solicitudTintoreria.activeSol;
        try {
            const resp = await fetchConToken(`solicitudTintoreria/delete/${ nroSolicitudTintoreria }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( solTDeleted() );
                Swal.fire(`Solicitud ${nroSolicitudTintoreria} Eliminada`, body.msg, 'success');
                setInterval(function(){ window.location.reload(); }, 2000);
                
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const solTStartAddNew = ( solicitud ) => {
    return async( dispatch, getState ) => {

        try {
            const resp = await fetchConToken('solicitudTintoreria/new', solicitud, 'POST');
            const body = await resp.json();
            
            if ( body.ok ) {
                dispatch( solTAddNew( solicitud) );
                Swal.fire(`Solicitud creada con exito!`, '', 'success');
                //setInterval(function(){ window.location.reload(); }, 1000);
                dispatch( solTStartLoading());
            }
            else {
            Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const solTStartUpdate = ( solicitud ) => {

    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`solicitudTintoreria/modify/${ solicitud.nroSolicitudTintoreria }`, solicitud, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( solTUpdated( solicitud ) );
                Swal.fire(`Solicitud modificado con exito!`, '', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const solTGetOne = ( id ) => {

    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( `solicitudTintoreria/solicitudUnica/${ id }`);
            const body = await resp.json();
            const solicitud = body.solicitudTintoreria;
            dispatch (solTLoadedOne(solicitud));

        }catch (error){
            console.log(error)
        }
    }
}