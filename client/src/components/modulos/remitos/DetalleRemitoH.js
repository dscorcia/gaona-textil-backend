import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { useParams } from 'react-router-dom';
import { remitoHGetOne } from '../../../actions/remitos';

export const DetalleRemitoH = () => {

    const { remitoHilanderia } = useParams();
    const dispatch = useDispatch();
    const { remito } = useSelector( state => state.remitosH );

    useEffect(() => {
        dispatch( remitoHGetOne(remitoHilanderia) );
        
    }, [ dispatch ]);

    const { articulos }  = remito;

    return (
        <div>
            <Navbar/>
            <div className="container animated fadeIn faster">
                <br></br>
                <h3>Detalle Remito - {remitoHilanderia}</h3>
                <br></br>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Remito Hilanderia</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Factura</th>
                                <th scope="col">Articulos</th>
                    
                            </tr>
                        </thead>
                            
                        <tbody>
                            <tr>
                                <td> { remitoHilanderia} </td>
                                <td> { remito.fecha } </td>
                                <td> { remito.nroFactura } </td>
                                <td> {
                                    articulos.map( (art, i) =>{
                                        return(
                                            <li key={i}>{ 
                                                ` Articulo: ${art.idArticulo} 
                                                - Color: ${art.color} 
                                                - Descripcion: ${art.descripcion} 
                                                - Cantidad Kgs: ${art.cantidadKgs} 
                                                - Cantidad Piezas: ${art.cantidadPiezas}
                                                ` }</li>
                                        )
                                    })}
                                    
                                </td>
                                
                            </tr>
                            
                            
                        </tbody>
                    </table>
            </div>


        </div>

    )

}