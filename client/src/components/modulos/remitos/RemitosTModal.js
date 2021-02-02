import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../../actions/ui';
import { remitoTClearActiveRemito, remitoTStartUpdate, remitoTStartAddNew } from '../../../actions/remitos';
import DateTimePicker from 'react-datetime-picker';

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

  const initRemito = {
    nroRemitoTintoreria: '',
    remitoHilanderia: [],
    fecha: new Date(),
    nroPartida: '',
    articulos: [],
    remitoNuevo: ''
}

const initArticulo = {
    idArticulo: '',
    descripcion: '',
    color: '',
    cantidadKgs: 0,
    cantidadKgsRib: 0,
    cantidadPiezas: 0,
    cantidadPiezasRib: 0
}

export const RemitosTModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeRemito } = useSelector( state => state.remitosT );
    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState( initRemito.fecha );
    const [formValues, setFormValues] = useState( initRemito );
    const { nroRemitoTintoreria, remitoHilanderia, fecha, nroPartida, articulos, remitoNuevo } = formValues;
    const [formValuesArt, setFormValuesArt] = useState( initArticulo );
    const { idArticulo, descripcion, color, cantidadKgs, cantidadKgsRib, cantidadPiezas, cantidadPiezasRib } = formValuesArt;


    useEffect(() => {
        if ( activeRemito ) {
            setFormValues( activeRemito );
        } else {
            setFormValues( initRemito );
        }
    }, [activeRemito, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleInputChangeArt = ({ target }) => {
        setFormValuesArt({
            ...formValuesArt,
            [target.name]: target.value
        });
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            fecha: e
        })
    }

    const onAddArticulo = (e) => {
        e.preventDefault();

       const item = {
        idArticulo,
        descripcion,
        color,
        cantidadKgs,
        cantidadPiezas
        }

        setFormValues({
            ...formValues,
            articulos: articulos.push(item)
        });

        setFormValuesArt(initArticulo);
        setFormValues({ ...formValues });

        console.log(articulos);
    }

    const onAddRemito = (e) => {
        e.preventDefault();

       const item = remitoNuevo;

        setFormValues({
            ...formValues,
            remitoHilanderia: remitoHilanderia.push(item)
        });

        setFormValues(initRemito);
        setFormValues({ ...formValues });

        console.log(remitoHilanderia);
    }

    const onDeleteArticulo = (e,art) => {
        e.preventDefault();
      
        setFormValues({
            ...formValues,
            articulos: articulos.filter( (articulo)=> articulo !== art ),
        });
    }

    const onDeleteRemito = (e,remitoh) => {
        e.preventDefault();
      
        setFormValues({
            ...formValues,
            remitoHilanderia: remitoHilanderia.filter( (remito)=> remito !== remitoh ),
        });
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( remitoTClearActiveRemito() );
        setFormValues( initRemito, {articulos: articulos.length = 0} );
        setFormValuesArt( initArticulo );
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

       if ( activeRemito ) {
            dispatch( remitoTStartUpdate( formValues ) );
        } 
        else {
            dispatch( remitoTStartAddNew(formValues) );
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
          <h5> { (activeRemito)? 'Editar remito': 'Nuevo remito' } </h5>
            <hr />
            <form className="container" 
                onSubmit={ handleSubmitForm }>
               
               <div>
                    <div className="form-row mb-2">
                        <div className="col">

               
                    <label>Remito Tintoreria</label>
                    <input 
                        className="form-control"
                        placeholder="Remito"
                        name="nroRemitoTintoreria"
                        autoComplete="off"
                        value={ nroRemitoTintoreria || ""}
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="col">
                    <label>Partida</label>
                    <input 
                        className="form-control" 
                        placeholder="Partida"
                        autoComplete="off"
                        name="nroPartida"
                        value={ nroPartida || ""}
                        onChange={ handleInputChange } />
                </div>
                </div>
                </div>

                <div className="form-group">
                    <label>Fecha</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ fecha }
                        className="form-control"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>


                <div className="form-group">
                    <label>Remitos Hilanderia</label>
                    <br></br>

                    { 
                        remitoHilanderia.length ? (
                        remitoHilanderia.map( (remito, i) => {
                        return( <li className="li-art" key={ i }> 
                                        ID Remito: { remito } - 
                                        
                                        <button className="btn btn-danger bot-trash-modal mr-2 ml-2" onClick={ (e)=> onDeleteRemito(e,remito)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                </li> )
                            
                        }) 
                    ): (
                        <span> Aun no se cargaron remitos </span> )
                    }
                  
                </div>

                
                <div>
                    <div className="form-row mb-2">
                        <div className="col">
                            <input 
                                className="form-control" 
                                placeholder="Remito Hilanderia"
                                autoComplete="off"
                                name="remitoNuevo"
                                value={ remitoNuevo || ""}
                                onChange={ handleInputChange }/>
                        </div>  

                        <div className="col">
                            <button className="btn btn-success" onClick={ onAddRemito }>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>

                    </div>       
                </div>





                <div className="form-group">
                    <label>Articulos</label>
                    <br></br>

                    { 
                        articulos.length ? (
                        articulos.map( (art, i) => {
                        return( <li className="li-art" key={ i }> 
                                        ID Articulo: { art.idArticulo } - 
                                        Descripcion: { art.descripcion } - 
                                        Color: { art.color } -
                                        CantidadKgs: { art.cantidadKgs } -
                                        CantidadPiezas: { art.cantidadPiezas } - 
                                        CantidadKgsRib: { art.cantidadKgsRib } -
                                        CantidadPiezasRib: { art.cantidadPiezasRib } - 
                                        <button className="btn btn-danger bot-trash-modal mr-2 ml-2" onClick={ (e)=> onDeleteArticulo(e,art)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                </li> )
                            
                        }) 
                    ): (
                        <span> Aun no se cargaron articulos </span> )
                    }
                  
                </div>

                
                <div>
                    <div className="form-row mb-2">
                        <div className="col">
                            <input 
                                className="form-control" 
                                placeholder="ID Articulo"
                                autoComplete="off"
                                name="idArticulo"
                                value={ idArticulo || ""}
                                onChange={ handleInputChangeArt }/>
                        </div>
                        <div className="col">
                            <input 
                                className="form-control" 
                                placeholder="Descripcion"
                                autoComplete="off"
                                name="descripcion"
                                value={ descripcion || ""}
                                onChange={ handleInputChangeArt }/>
                        </div>
                        <div className="col">
                            <input
                                className="form-control" 
                                placeholder="Color"
                                autoComplete="off"
                                name="color"
                                value={ color || ""}
                                onChange={ handleInputChangeArt }/>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col">
                            <input
                                className="form-control" 
                                placeholder="Cantidad KG"
                                autoComplete="off"
                                name="cantidadKgs"
                                value={ cantidadKgs || ""}
                                onChange={ handleInputChangeArt }/>
                        </div>
                        <div className="col">
                            <input
                                className="form-control" 
                                placeholder="Cantidad KG Rib"
                                autoComplete="off"
                                name="cantidadKgsRib"
                                value={ cantidadKgsRib || ""}
                                onChange={ handleInputChangeArt }/>
                        </div>
                        <div className="col">
                            <input
                                className="form-control" 
                                placeholder="Cantidad Piezas"
                                autoComplete="off"
                                name="cantidadPiezas"
                                value={ cantidadPiezas || ""}
                                onChange={ handleInputChangeArt }/>
                        </div>
                        <div className="col">
                            <input
                                className="form-control" 
                                placeholder="Cantidad Piezas Rib"
                                autoComplete="off"
                                name="cantidadPiezasRib"
                                value={ cantidadPiezasRib || ""}
                                onChange={ handleInputChangeArt }/>
                        </div>
                        
                        <div className="col">
                            <button className="btn btn-success" onClick={ onAddArticulo }>
                                <i className="fas fa-plus"></i>
                            </button>
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


