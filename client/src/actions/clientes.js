import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const clienteAddNew = (cliente) => ({
    type: types.clienteAddNew,
    payload: cliente
});

export const clienteSetActive = (cliente) => ({
    type: types.clienteSetActive,
    payload: cliente
});

export const clienteClearActiveCliente = () => ({ type: types.clienteClearActiveCliente });

export const clienteUpdated = ( cliente ) => ({
    type: types.clienteUpdated,
    payload: cliente
});

export const clienteDeleted = () => ({ 
    type: types.clienteDeleted
 });

 const clienteLoaded = (clientes) => ({
    type: types.clienteLoaded,
    payload: clientes
});


export const clienteStartLoading = () => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( 'cliente/clientes' );
            const body = await resp.json();

            const clientes = body.clientes;
            console.log(clientes);
            dispatch (clienteLoaded(clientes))

        }catch (error){
            console.log(error)

        }
    }
}

export const clienteStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { idRegistro, nombre } = getState().clientes.activeCliente;
        try {
            const resp = await fetchConToken(`cliente/delete/${ idRegistro }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( clienteDeleted() );
                Swal.fire(`Cliente ${nombre} Eliminado`, body.msg, 'success');
                setInterval(function(){ window.location.reload(); }, 2000);
                
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}


export const clienteStartAddNew = ( cliente ) => {
    return async( dispatch, getState ) => {

        //const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('cliente/new', cliente, 'POST');
            const body = await resp.json();
            console.log(cliente);
            console.log(body);

            if ( body.ok ) {
                dispatch( clienteAddNew( cliente ) );
                Swal.fire(`Cliente creado con exito!`, '', 'success');
                //setInterval(function(){ window.location.reload(); }, 1000);
                dispatch( clienteStartLoading());
            }
            else {
            Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const clienteStartUpdate = ( cliente ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`cliente/modify/${ cliente.idRegistro }`, cliente, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( clienteUpdated( cliente ) );
                Swal.fire(`Cliente modificado con exito!`, '', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

