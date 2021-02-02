import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';


export const usuarioAddNew = (usuario) => ({
    type: types.usuarioAddNew,
    payload: usuario
});


export const usuarioSetActive = (usuario) => ({
    type: types.usuarioSetActive,
    payload: usuario
});


export const usuarioClearActiveUsuario = () => ({ type: types.usuarioClearActiveUsuario });


export const usuarioUpdated = ( usuario ) => ({
    type: types.usuarioUpdated,
    payload: usuario
});

export const usuarioUpdatedPass = (  ) => ({
    type: types.usuarioUpdated
    //payload: usuario
});


export const usuarioDeleted = () => ({ 
    type: types.usuarioDeleted
 });

 const usuarioLoaded = (usuarios) => ({
    type: types.usuarioLoaded,
    payload: usuarios
});



 export const usuarioStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { name } = getState().usuarios.activeUsuario;
        try {
            const resp = await fetchConToken(`auth/delete/${ name }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( usuarioDeleted() );
                Swal.fire(`Usuario ${name} Eliminado`, body.msg, 'success');
                setInterval(function(){ window.location.reload(); }, 2000);
                
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}



export const usuarioStartLoading = () => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken( 'auth/usuarios' );
            const body = await resp.json();

            //console.log(body);

            const usuarios = body.usuarios;
            console.log(usuarios);
            dispatch (usuarioLoaded(usuarios))
            

        }catch (error){
            console.log(error)

        }
    }
}


export const usuarioStartAddNew = ( usuario ) => {
    return async( dispatch, getState ) => {

        //const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('auth/new', usuario, 'POST');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( usuarioAddNew( usuario ) );
                Swal.fire(`Usuario ${usuario.name} creado con exito!`, 'Por favor actualice la Password', 'success');
            }
            else {
            Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const usuarioStartUpdate = ( usuario ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`auth/modify/${ usuario.name }`, usuario, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( usuarioUpdated( usuario ) );
                Swal.fire(`Usuario ${usuario.name} modificado con exito!`, '', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const usuarioStartUpdatePass = ( usuario ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`auth/modifypass/${ usuario.name }`, usuario, 'PUT' );
            const body = await resp.json();
            console.log(body);

            if ( body.ok ) {
                dispatch( usuarioUpdated( usuario ) );
                Swal.fire(`Usuario ${usuario.name} modificado con exito!`, '', 'success');
                setInterval(function(){ window.location.reload(); }, 1000);

            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}



