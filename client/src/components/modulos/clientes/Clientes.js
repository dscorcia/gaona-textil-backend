import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../Navbar';
import { uiOpenModal } from '../../../actions/ui';
import { clienteStartLoading, clienteSetActive, clienteStartDelete } from '../../../actions/clientes';
import { ClientesModal } from '../clientes/ClientesModal';


export const Clientes = () => {

    const dispatch = useDispatch();
    const { clientes, activeCliente } = useSelector( state => state.clientes );

    useEffect(() => {
        dispatch( clienteStartLoading() );
        
    }, [ dispatch ]);

    const onOpenModal = (e) => {
        dispatch( uiOpenModal() );
    }

    function onModifyCliente(cliente){

        dispatch( clienteSetActive(cliente ) );
        dispatch( uiOpenModal() );
    }

    function onDeleteCliente(cliente){
        dispatch( clienteSetActive(cliente ) );
        dispatch( clienteStartDelete() );
    }


    return (
        <div>
            <Navbar/>
        
        <div className="container animated fadeIn faster">
            <br></br>
            <h3>Clientes</h3>
                   
            <div className="bot-sum" onClick={ onOpenModal }>
            <button className="btn btn-success fab">
                <i className="fas fa-plus"></i>
            </button>
            </div>
            
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Registro</th>
                    <th scope="col">CUIT</th>
                    <th scope="col">Razon Social</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>

            <tbody>

                {
                    clientes.map ( (cliente, i) => {

                        cliente.idRegistro = cliente._id;
                        
                        return(
                            <tr key={ i}>
                                <td>{ i }</td>
                                <td>{ cliente.cuit }</td>
                                <td>{ cliente.razonSocial }</td>
                                <td>{ cliente.nombre }</td>
                                <td>{ cliente.telefono }</td>
                               
                                <td>
                                    <button className="btn btn-info mr-2" onClick={ ()=> onModifyCliente(cliente)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger mr-2" onClick={ ()=> onDeleteCliente(cliente)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>

                        )
                    })
                }
                
            </tbody>

        </table>
            
        </div>

        <ClientesModal />
        </div>
    )
}
