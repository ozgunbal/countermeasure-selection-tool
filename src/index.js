import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);