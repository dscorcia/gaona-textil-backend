import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../../actions/ui';
import { clienteClearActiveCliente, clienteStartUpdate, clienteStartAddNew } from '../../../actions/clientes';

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


const initCliente = {
    //idRegistro: "",
    cuit: "",
    razonSocial: "",
    nombre: "",
    telefono: ""

}

export const ClientesModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeCliente } = useSelector( state => state.clientes );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState( initCliente );

    const { cuit, razonSocial, nombre, telefono } = formValues;

    useEffect(() => {
        if ( activeCliente ) {
            setFormValues( activeCliente );
        } else {
            setFormValues( initCliente );
        }
    }, [activeCliente, setFormValues])


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
        dispatch( clienteClearActiveCliente() );
        setFormValues( initCliente );
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

       if ( activeCliente ) {
            dispatch( clienteStartUpdate( formValues ) );
        } 
        else {
            dispatch( clienteStartAddNew(formValues) );
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
          <h1> Nuevo Cliente </h1>
            <hr />
            <form className="container" 
                onSubmit={ handleSubmitForm }>
               

                <div className="form-group">
                <label>CUIT</label>
                    <input 
                        className="form-control" 
                        placeholder="cuit"
                        autoComplete="off"
                        name="cuit"
                        value={ cuit || "" }
                        onChange={ handleInputChange }
                    />
                </div>
                
                <div className="form-group">
                    <label>Razon Social</label>
                    <input 
                        className="form-control" 
                        placeholder="Razon Social"
                        autoComplete="off"
                        name="razonSocial"
                        value={ razonSocial || "" }
                        onChange={ handleInputChange } />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input 
                        className="form-control" 
                        placeholder="Nombre"
                        autoComplete="off"
                        name="nombre"
                        value={ nombre || ""}
                        onChange={ handleInputChange } />
                </div>
                <div className="form-group">
                    <label>Telefono</label>
                    <input 
                        className="form-control" 
                        placeholder="Telefono"
                        autoComplete="off"
                        name="telefono"
                        value={ telefono || ""}
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