import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AppRouter } from '../router/AppRouter';

export const GaonaApp = () => {
    return (
    <Provider store={ store }>
        <div>
            <AppRouter/>
        </div>
    </Provider>
    )
    
}
