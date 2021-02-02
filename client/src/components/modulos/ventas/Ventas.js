import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { uiOpenModal } from '../../../actions/ui';
import { ventaStartLoading, ventaSetActive, ventaStartDelete, ventaGetOne } from '../../../actions/ventas';
import { VentasModal } from '../ventas/VentasModal';
import { Link, Redirect } from 'react-router-dom';


export const Ventas = ( {history} ) => {

    const dispatch = useDispatch();
    const { ventas, activeVenta } = useSelector( state => state.ventas );

    useEffect(() => {
        dispatch( ventaStartLoading() );
        
    }, [ dispatch ]);


    const onOpenModal = (e) => {
        dispatch( uiOpenModal() );
    }

    function onDetailVenta(venta) {
        //dispatch( ventaSetActive(venta ) );
        dispatch(ventaGetOne(venta.remitoVenta));
        history.push(`/ventas/detalle/${venta.remitoVenta}`);
    }

    function onModifyVenta(venta){

        dispatch( ventaSetActive(venta ) );
        dispatch( uiOpenModal() );
    }

    function onDeleteVenta(venta){
        dispatch( ventaSetActive(venta) );
        dispatch( ventaStartDelete() );
    }
    

    return (
        <div>
            <Navbar/>
        
        <div className="container animated fadeIn faster">
            
            <br></br>
            <h3>Ventas</h3>
        
            <div className="bot-sum">
                <button className="btn btn-success fab" onClick={ onOpenModal }>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Remito Venta</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>

            <tbody>
                {
                    ventas.map ( (venta) => {

                        
                        return(
                            <tr key= {venta.remitoVenta}>
                                
                                <td>{ venta.remitoVenta }</td>
                                <td>{ new Date(venta.fecha).toLocaleDateString() }</td>
                                <td>{ venta.cliente }</td>
                               
                                <td>
                                    <button className="btn btn-info mr-2" onClick={ ()=> onModifyVenta(venta)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger mr-2" onClick={ ()=> onDeleteVenta(venta)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>

                                    <button className="btn btn-primary mr-2" onClick={ ()=> onDetailVenta(venta)}>
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
        <VentasModal />
        </div>
    )
}
