import { createStore } from 'redux';
import rori from './reducers'

const configureStore = () => createStore(rori);

export default configureStore;