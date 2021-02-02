import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { uiOpenModal } from '../../../actions/ui';
import { solTStartLoading, solTSetActive, solTStartDelete, solTGetOne } from '../../../actions/solicitudTintoreria';
import { SolicitudTintoreriaModal } from '../remitos/SolicitudTintoreriaModal';

export const SolicitudTintoreria = ( {history} ) => {

    const dispatch = useDispatch();
    const { solicitudes, activeSol } = useSelector( state => state.solicitudTintoreria );

    useEffect(() => {
        dispatch( solTStartLoading() );
        
    }, [ dispatch ]);

    const onOpenModal = (e) => {
        dispatch( uiOpenModal() );
    }

    function onDetailSol(solicitud) {
        dispatch(solTGetOne(solicitud.nroSolicitudTintoreria));
        history.push(`/solictintoreria/detalle/${solicitud.nroSolicitudTintoreria}`);
    }

    function onModifySol(solicitud){

        dispatch( solTSetActive(solicitud ) );
        dispatch( uiOpenModal() );
    }

    function onDeleteSol(solicitud){
        dispatch( solTSetActive(solicitud) );
        dispatch( solTStartDelete() );
    }

    return (
        <div>
            <Navbar/>

            <div className="container animated fadeIn faster">
            <br></br>
            <h3>Solicitudes Tintorería</h3>

            <div className="bot-sum">
                <button className="btn btn-success fab" onClick={ onOpenModal }>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <br></br>            
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Solicitud Tintoreria</th>
                            <th scope="col">Remito Hilanderia</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Partida</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                    solicitudes.map ( (solicitud) => {

                        
                        return(
                            <tr key= {solicitud.nroSolicitudTintoreria}>
                                
                                <td>{ solicitud.nroSolicitudTintoreria }</td>
                                <td>{ solicitud.remitoHilanderia }</td>
                                <td>{ new Date(solicitud.fecha).toLocaleDateString() }</td>
                                <td>{ solicitud.nroPartida }</td>
                               
                                <td>
                                    <button className="btn btn-info mr-2" onClick={ ()=> onModifySol(solicitud)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger mr-2" onClick={ ()=> onDeleteSol(solicitud)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>

                                    <button className="btn btn-primary mr-2" onClick={ ()=> onDetailSol(solicitud)}>
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
            <SolicitudTintoreriaModal />
        </div>
    )





}