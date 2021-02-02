import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../../actions/ui';
import { stockClearActiveStock, stockStartUpdate, stockStartAddNew } from '../../../actions/stock';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      height                : 'auto',
      maxWidth             : '760px',                
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');

  const initStock = {
    idArticulo: '',
    descripcion: '',
    color: '',
    cantidadKgsNegocio: '',
    cantidadPiezasNegocio: '',
    cantidadKgsTintoreria: '',
    cantidadPiezasTintoreria: '',
    costo: '',
    subtotalCosto: '',
    fabrica_tintoreria: '',
    empresa: ''
}

export const StockModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeStock } = useSelector( state => state.stock );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState( initStock );
    const { idArticulo, 
            descripcion, 
            color, 
            cantidadKgsNegocio, 
            cantidadPiezasNegocio, 
            cantidadKgsTintoreria, 
            cantidadPiezasTintoreria,
            costo,
            subtotalCosto,
            fabrica_tintoreria,
            empresa 
    } = formValues;

    useEffect(() => {
        if ( activeStock ) {
            setFormValues( activeStock );
        } else {
            setFormValues( initStock );
        }
    }, [activeStock, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( stockClearActiveStock() );
        setFormValues( initStock );
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

       if ( activeStock ) {
            dispatch( stockStartUpdate( formValues ) );
        } 
        else {
            dispatch( stockStartAddNew(formValues) );
        }
        closeModal();
    }

    return (
        <div>
        <Modal
        isOpen={ modalOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className="modal"
        overlayClassName="modal-fondo"
        >
          <h5> { (activeStock)? 'Editar stock': 'Nuevo stock' } </h5>
            <hr />
            <form className="container" 
                onSubmit={ handleSubmitForm }>
               

               <div className="form-group">
                    <label>ID Articulo </label>
                    <input 
                        className="form-control"
                        placeholder="ID Articulo"
                        name="idArticulo"
                        autoComplete="off"
                        value={ idArticulo || ""}
                        onChange={ handleInputChange }
                    />
                </div>

                <div>
                    <div className="form-row mb-2">
                        
                        <div className="col">
                            <div className="form-group">
                            <label>Descripción</label>
                            <input 
                                className="form-control" 
                                placeholder="Descripción"
                                autoComplete="off"
                                name="descripcion"
                                value={ descripcion || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>


                        <div className="col">
                            <div className="form-group">
                            <label>Color</label>
                            <input 
                                className="form-control" 
                                placeholder="color"
                                autoComplete="off"
                                name="color"
                                value={ color || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                    </div>
                
                    <div className="form-row mb-2">
                        
                        <div className="col">
                            <div className="form-group">
                            <label>Cantidad KG Negocio</label>
                            <input 
                            className="form-control" 
                            placeholder="Cant. KG negocio"
                            autoComplete="off"
                            name="cantidadKgsNegocio"
                            value={ cantidadKgsNegocio || ""}
                            onChange={ handleInputChange } />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                            <label>Cantidad Piezas Negocio</label>
                            <input 
                                className="form-control" 
                                placeholder="Cant. Piezas negocio"
                                autoComplete="off"
                                name="cantidadPiezasNegocio"
                                value={ cantidadPiezasNegocio || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                    </div>

                    <div className="form-row mb-2">

                        <div className="col">
                            <div className="form-group">
                            <label>Cantidad KG Tintoreria</label>
                            <input 
                                className="form-control" 
                                placeholder="Cant. KG tintorería"
                                autoComplete="off"
                                name="cantidadKgsTintoreria"
                                value={ cantidadKgsTintoreria || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                            <label>Cantidad Piezas Tintorería</label>
                            <input 
                                className="form-control" 
                                placeholder="Cant. Piezas tintorería"
                                autoComplete="off"
                                name="cantidadPiezasTintoreria"
                                value={ cantidadPiezasTintoreria || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                    </div>

                    <div className="form-row mb-2">
                        <div className="col">
                            <div className="form-group">
                            <label>Costo</label>
                            <input 
                                className="form-control" 
                                placeholder="Costo"
                                autoComplete="off"
                                name="costo"
                                value={ costo || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                            <label>Subtotal Costo</label>
                            <input 
                                className="form-control" 
                                placeholder="Subtotal Costo"
                                autoComplete="off"
                                name="subtotalCosto"
                                value={ subtotalCosto || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                    </div>

                    <div className="form-row mb-2">
                        <div className="col">
                            <div className="form-group">
                            <label>Fabrica Tintoreria</label>
                            <input 
                                className="form-control" 
                                placeholder="Fabrica Tintorería"
                                autoComplete="off"
                                name="fabrica_tintoreria"
                                value={ fabrica_tintoreria || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                            <label>Empresa</label>
                            <input 
                                className="form-control" 
                                placeholder="Empresa"
                                autoComplete="off"
                                name="empresa"
                                value={ empresa || ""}
                                onChange={ handleInputChange } />
                            </div>
                        </div>

                    </div>
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
     
    </div>
      
    )


}
