import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiClosePassModal } from '../../../actions/ui';
import { usuarioClearActiveUsuario, usuarioStartUpdatePass } from '../../../actions/usuarios';

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

  const initPass = {
    name: '',
    password: ''
}

  export const PassModal = () => {

    const { modalPassOpen } = useSelector( state => state.ui );
    const { activeUsuario } = useSelector( state => state.usuarios );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState( initPass );

    const { password } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closePassModal = () => {
        // TODO: cerrar el modal
        dispatch( uiClosePassModal() );
        dispatch( usuarioClearActiveUsuario() );
        setFormValues( initPass );
    }

    const handleSubmitForm = (e) => {
        formValues.name = activeUsuario.name;
        e.preventDefault();
        dispatch( usuarioStartUpdatePass( formValues ) );
        closePassModal();
    }

    return (
        <Modal
        isOpen={ modalPassOpen }
        onRequestClose={ closePassModal }
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
                    <label>Ingrese nueva Password</label>
                    <input 
                        className="form-control" 
                        placeholder="Nueva Password"
                        autoComplete="off"
                        name="password"
                        value={ password || ""}
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