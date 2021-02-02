import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import { usuariosReducer } from './usuariosReducer';
import { clientesReducer } from './clientesReducer';
import { ventasReducer } from './ventasReducer';
import { remitosHReducer } from './remitosHReducer';
import { remitosTReducer } from './remitosTReducer';
import { stockReducer } from './stockReducer';
import { solicitudTintoreriaReducer } from './SolicitudTintoreriaReducer';


export const rootReducer = combineReducers({

    ui: uiReducer,
    auth: authReducer,
    usuarios: usuariosReducer,
    clientes: clientesReducer,
    ventas: ventasReducer,
    remitosH : remitosHReducer,
    remitosT: remitosTReducer,
    stock: stockReducer,
    solicitudTintoreria: solicitudTintoreriaReducer
})

