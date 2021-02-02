import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { uiOpenModal } from '../../../actions/ui';
import { remitoTStartLoading, remitoTSetActive, remitoTStartDelete, remitoTGetOne } from '../../../actions/remitos';
import { RemitosTModal } from '../remitos/RemitosTModal';

export const RemitoTintoreria = ( {history} ) => {

    const dispatch = useDispatch();
    const { remitos, activeRemito } = useSelector( state => state.remitosT );

    useEffect(() => {
        dispatch( remitoTStartLoading() );
        
    }, [ dispatch ]);

    const onOpenModal = (e) => {
        dispatch( uiOpenModal() );
    }

    function onDetailRemito(remito) {
        dispatch(remitoTGetOne(remito.nroRemitoTintoreria));
        history.push(`/tintoreria/detalle/${remito.nroRemitoTintoreria}`);
    }

    function onModifyRemito(remito){

        dispatch( remitoTSetActive(remito ) );
        dispatch( uiOpenModal() );
    }

    function onDeleteRemito(remito){
        dispatch( remitoTSetActive(remito) );
        dispatch( remitoTStartDelete() );
    }


    return (
        <div>
            <Navbar/>

            <div className="container animated fadeIn faster">
            <br></br>
            <h3>Remitos</h3>

            <div className="bot-sum">
                <button className="btn btn-success fab" onClick={ onOpenModal }>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <br></br>            
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Remito Tintoreria</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Partida</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                    remitos.map ( (remito) => {

                        
                        return(
                            <tr key= {remito.nroRemitoTintoreria}>
                                
                                <td>{ remito.nroRemitoTintoreria }</td>
                                <td>{ new Date(remito.fecha).toLocaleDateString()} </td>
                                <td>{ remito.nroPartida }</td>
                               
                                <td>
                                    <button className="btn btn-info mr-2" onClick={ ()=> onModifyRemito(remito)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger mr-2" onClick={ ()=> onDeleteRemito(remito)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>

                                    <button className="btn btn-primary mr-2" onClick={ ()=> onDetailRemito(remito)}>
                                        <i className="fas fa-file-alt mr-2"></i>
                                        Ver detalle
                                    </button>
                                </td>
                        </tr>

                        )
                    })
                }
                    </tbody>
                </table>
            
            </div>
            <RemitosTModal />
        </div>
    )
}
