import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { LandingHome } from '../components/LandingHome';
import { Login } from '../components/Login';
import { startChecking } from '../actions/auth';
import { Clientes } from '../components/modulos/clientes/Clientes';
import { Ventas } from '../components/modulos/ventas/Ventas';
import { Stock } from '../components/modulos/stock/Stock';
import { Usuarios } from '../components/modulos/usuarios/Usuarios';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Remitos } from '../components/modulos/Remitos';
import { Facturas } from '../components/modulos/Facturas';
import { DetalleVenta } from '../components/modulos/ventas/DetalleVenta';
import { RemitoHilanderia } from '../components/modulos/remitos/RemitoHilanderia';
import { RemitoTintoreria } from '../components/modulos/remitos/RemitoTintoreria';
import { DetalleRemitoH } from '../components/modulos/remitos/DetalleRemitoH';
import { DetalleRemitoT } from '../components/modulos/remitos/DetalleRemitoT';
import { DetalleStock } from '../components/modulos/stock/DetalleStock';
import { SolicitudTintoreria } from '../components/modulos/remitos/SolicitudTintoreria';
import { DetalleSolicitudTintoreria } from '../components/modulos/remitos/DetalleSolicitudTintoreria';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact 
                        path="/login" 
                        component={ Login }
                        isAuthenticated={ !!uid } 
                    />
                    <PrivateRoute
                        exact 
                        path="/home" 
                        component={ LandingHome }
                        isAuthenticated={ !!uid }
                    />      
                    <PrivateRoute 
                        exact 
                        path="/clientes" 
                        component={ Clientes }
                        isAuthenticated={ !!uid } 
                    />
                    <PrivateRoute 
                        exact 
                        path="/ventas" 
                        component={ Ventas } 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        exact 
                        path="/ventas/detalle/:remitoVenta" 
                        component={ DetalleVenta } 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        exact 
                        path="/stock" 
                        component={ Stock }
                        isAuthenticated={ !!uid } 
                    />
                    <PrivateRoute 
                        exact 
                        path="/stock/detalle/:idArticulo/:color" 
                        component={ DetalleStock } 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        exact 
                        path="/usuarios" 
                        component={ Usuarios }
                        isAuthenticated={ !!uid } 
                    />

                    <PrivateRoute 
                        exact 
                        path="/hilanderia" 
                        component={ RemitoHilanderia }
                        isAuthenticated={ !!uid } 
                    />

                    <PrivateRoute 
                        exact 
                        path="/hilanderia/detalle/:remitoHilanderia" 
                        component={ DetalleRemitoH } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/tintoreria" 
                        component={ RemitoTintoreria }
                        isAuthenticated={ !!uid } 
                    />

                    <PrivateRoute 
                        exact 
                        path="/tintoreria/detalle/:remitoTintoreria" 
                        component={ DetalleRemitoT } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/solictintoreria" 
                        component={ SolicitudTintoreria }
                        isAuthenticated={ !!uid } 
                    />

                    <PrivateRoute 
                        exact 
                        path="/solictintoreria/detalle/:solicitudTintoreria" 
                        component={ DetalleSolicitudTintoreria } 
                        isAuthenticated={ !!uid }
                    />


                    <Redirect to="/home" />   
                </Switch>
            </div>
        </Router>
    )
}
