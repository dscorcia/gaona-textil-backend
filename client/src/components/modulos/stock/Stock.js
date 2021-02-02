import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { uiOpenModal } from '../../../actions/ui';
import { stockStartLoading, stockSetActive, stockStartDelete, stockGetOne } from '../../../actions/stock';
import { StockModal } from '../stock/StockModal';


export const Stock = ( {history} ) => {

    const dispatch = useDispatch();
    const { stock, activeStock } = useSelector( state => state.stock );

    useEffect(() => {
        dispatch( stockStartLoading() );
        
    }, [ dispatch ]);

    const onOpenModal = (e) => {
        dispatch( uiOpenModal() );
    }

    function onDetailStock(stock) {
        dispatch(stockGetOne(stock.idArticulo, stock.color));
        history.push(`/stock/detalle/${stock.idArticulo}/${stock.color}`);
    }

    function onModifyStock(stock){

        dispatch( stockSetActive(stock ) );
        dispatch( uiOpenModal() );
    }

    function onDeleteStock(stock){
        dispatch( stockSetActive(stock) );
        dispatch( stockStartDelete() );
    }



    return (
        <div>
            <Navbar/>
        
        <div className="container animated fadeIn faster">
            <br></br>
            <h3>Articulos</h3>
        
            <div className="bot-sum">
                <button className="btn btn-success fab" onClick={ onOpenModal }>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            
            
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">ID Articulo</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Color</th>
                    <th scope="col">KG Negocio</th>
                    <th scope="col">Piezas Negocio</th>
                    <th scope="col">Empresa</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>

            <tbody>
            {
                    stock.map ( (stock, i) => {

                        return(
                            <tr key= {i}>
                                
                                <td>{ stock.idArticulo }</td>
                                <td>{ stock.descripcion }</td>
                                <td>{ stock.color }</td>
                                <td>{ stock.cantidadKgsNegocio }</td>
                                <td>{ stock.cantidadPiezasNegocio }</td>
                                <td>{ stock.empresa }</td>
                                <td>
                                    <button className="btn btn-info mr-2" onClick={ ()=> onModifyStock(stock)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger mr-2" onClick={ ()=> onDeleteStock(stock)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>

                                    <button className="btn btn-primary mr-2" onClick={ ()=> onDetailStock(stock)}>
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
        <StockModal />
        </div>
    )
}
