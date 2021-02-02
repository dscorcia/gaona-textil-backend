import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../../actions/ui';
import { usuarioClearActiveUsuario, usuarioStartUpdate, usuarioStartAddNew } from '../../../actions/usuarios';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      height                : 'auto',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');

  const initUsuario = {
    name: '',
    nombre: '',
    apellido: '',
    dni: 0,
    perfil: '',
    //password: ''

}

export const UsuariosModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeUsuario } = useSelector( state => state.usuarios );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState( initUsuario );

    const { name, nombre, apellido, dni, perfil } = formValues;



    //const [ usuarioValid, setUsuarioValid ] = useState(true);

    //const [ passValid, setPassValid ] = useState(true);


    useEffect(() => {
        if ( activeUsuario ) {
            setFormValues( activeUsuario );
        } else {
            setFormValues( initUsuario );
        }
    }, [activeUsuario, setFormValues])


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
        dispatch( usuarioClearActiveUsuario() );
        setFormValues( initUsuario );
    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

       if ( activeUsuario ) {
            dispatch( usuarioStartUpdate( formValues ) );
        } 
        else {
            dispatch( usuarioStartAddNew(formValues) );
        }
        closeModal();
    }

    return (
        <Modal
        isOpen={ modalOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className="modal"
        overlayClassName="modal-fondo"
        >
          <h1> Nuevo usuario </h1>
            <hr />
            <form className="container" 
                onSubmit={ handleSubmitForm }>

                <div className="form-group">
                    <label>Usuario</label>
                    <input 
                        className="form-control"
                        placeholder="Usuario"
                        name="name"
                        autoComplete="off"
                        value={ name || ""}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                <label>Nombre</label>
                    <input 
                        className="form-control" 
                        placeholder="Nombre"
                        autoComplete="off"
                        name="nombre"
                        value={ nombre || "" }
                        onChange={ handleInputChange }
                    />
                </div>
                
                <div className="form-group">
                    <label>Apellido</label>
                    <input 
                        className="form-control" 
                        placeholder="Apellido"
                        autoComplete="off"
                        name="apellido"
                        value={ apellido || "" }
                        onChange={ handleInputChange } />
                </div>
                <div className="form-group">
                    <label>DNI</label>
                    <input 
                        className="form-control" 
                        placeholder="DNI"
                        autoComplete="off"
                        name="dni"
                        value={ dni || ""}
                        onChange={ handleInputChange } />
                </div>
                <div className="form-group">
                    <label>Perfil</label>
                    <input 
                        className="form-control" 
                        placeholder="Perfil"
                        autoComplete="off"
                        name="perfil"
                        value={ perfil || ""}
                        onChange={ handleInputChange } />
                </div>
            
            <button
            type="submit"
            className="btn btn-info btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

            </form> 
      
      </Modal>

      
    )
}
