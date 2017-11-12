import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <App store = {store}/>
    </Provider>,
    document.getElementById('root')
);