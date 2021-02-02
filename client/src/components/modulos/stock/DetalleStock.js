import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { useParams } from 'react-router-dom';
import { stockGetOne } from '../../../actions/stock';

export const DetalleStock = () => {
    
    const { idArticulo, color } = useParams();
    const dispatch = useDispatch();
    const { articulo } = useSelector( state => state.stock );

    useEffect(() => {
        dispatch( stockGetOne(idArticulo, color) );
        
    }, [ dispatch ]);

        return (
            <div>
                <Navbar/>
                <div className="container animated fadeIn faster">
                    <br></br>
                    <h3>Stock Artículo { idArticulo } - { color } </h3>
                    <br></br>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID Articulo</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Kg Negocio</th>
                                    <th scope="col">Piezas Negocio</th>
                                    <th scope="col">Kg Tintorería</th>
                                    <th scope="col">Piezas Tintorería</th>
                                    <th scope="col">Costo</th>
                                    <th scope="col">Subtotal Costo</th>
                                    <th scope="col">Fabrica Tintorería</th>
                                    <th scope="col">Empresa</th>
                                </tr>
                            </thead>
                                
                            <tbody>
                                <tr>
                                    <td> { idArticulo} </td>
                                    <td> { articulo.descripcion } </td>
                                    <td> { color } </td>
                                    <td> { articulo.cantidadKgsNegocio } </td>
                                    <td> { articulo.cantidadPiezasNegocio } </td>
                                    <td> { articulo.cantidadKgsTintoreria } </td>
                                    <td> { articulo.cantidadPiezasTintoreria } </td>
                                    <td> { articulo.costo } </td>
                                    <td> { articulo.subtotalcosto } </td>
                                    <td> { articulo.fabrica_tintoreria } </td>
                                    <td> { articulo.empresa } </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                </div>
    
    
            </div>
    
        )
    }
    




