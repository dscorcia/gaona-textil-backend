import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { uiOpenModal } from '../../../actions/ui';
import { remitoHStartLoading, remitoHSetActive, remitoHStartDelete, remitoHGetOne } from '../../../actions/remitos';
import { RemitosHModal } from '../remitos/RemitosHModal';

export const RemitoHilanderia = ( {history} ) => {

    const dispatch = useDispatch();
    const { remitos, activeRemito } = useSelector( state => state.remitosH );

    useEffect(() => {
        dispatch( remitoHStartLoading() );
        
    }, [ dispatch ]);

    const onOpenModal = (e) => {
        dispatch( uiOpenModal() );
    }

    function onDetailRemito(remito) {
        dispatch(remitoHGetOne(remito.remitoHilanderia));
        history.push(`/hilanderia/detalle/${remito.remitoHilanderia}`);
    }

    function onModifyRemito(remito){

        dispatch( remitoHSetActive(remito ) );
        dispatch( uiOpenModal() );
    }

    function onDeleteRemito(remito){
        dispatch( remitoHSetActive(remito) );
        dispatch( remitoHStartDelete() );
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
                            <th scope="col">Remito Hilanderia</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Factura</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                    remitos.map ( (remito) => {

                        
                        return(
                            <tr key= {remito.remitoHilanderia}>
                                
                                <td>{ remito.remitoHilanderia }</td>
                                <td>{ new Date(remito.fecha).toLocaleDateString() }</td>
                                <td>{ remito.nroFactura }</td>
                               
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
            <RemitosHModal />
        </div>
    )
}
