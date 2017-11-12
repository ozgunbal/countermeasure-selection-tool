import { createStore, applyMiddleware } from 'redux';
import rori from './reducers'

const configureStore = () => {
    return createStore(
        rori
    );
}

export default configureStore;