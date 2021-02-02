import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { useParams } from 'react-router-dom';
import { remitoTGetOne } from '../../../actions/remitos';

export const DetalleRemitoT = () => {

    const { remitoTintoreria } = useParams();
    const dispatch = useDispatch();
    const { remito } = useSelector( state => state.remitosT );

    useEffect(() => {
        dispatch( remitoTGetOne(remitoTintoreria) );
        
    }, [ dispatch ]);

    const { articulos, remitoHilanderia }  = remito;

    return (
        <div>
            <Navbar/>
            <div className="container animated fadeIn faster">
                <br></br>
                <h3>Detalle Remito - {remitoTintoreria}</h3>
                <br></br>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Remito Tintoreria</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Partida</th>
                                <th scope="col">Remito Hilanderia</th>
                                <th scope="col">Articulos</th>
                    
                            </tr>
                        </thead>
                            
                        <tbody>
                            <tr>
                                <td> { remitoTintoreria} </td>
                                <td> { remito.fecha } </td>
                                <td> { remito.nroPartida } </td>
                                <td> {
                                    remitoHilanderia.map( (remito, i) =>{
                                        return(
                                            <li className="li-art" key={i}>{ 
                                                ` ${remito} 
                                            ` }</li>
                                        )
                                    })}
                                    
                                </td>

                                <td> {
                                    articulos.map( (art, i) =>{
                                        return(
                                            <li key={i}>{ 
                                                ` Articulo: ${art.idArticulo} 
                                                - Color: ${art.color} 
                                                - Descripcion: ${art.descripcion} 
                                                - Cantidad Kgs: ${art.cantidadKgs} 
                                                - Cantidad Kgs Rib: ${art.cantidadKgs} 
                                                - Cantidad Piezas: ${art.cantidadPiezas}
                                                - Cantidad Piezas Rib: ${art.cantidadPiezas}
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