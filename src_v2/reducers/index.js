import Simulation from '../simulation';
import { combineReducers } from 'redux';
import volumes from './volume';

const roris = Simulation.simulation();

const roriDisplay = (state = roris[0], action) => {
    switch(action.type) {
    case 'CHANGE_DISPLAY_RORI':
        return action.rori;
    default:
        return state;
    }
}

const roriList = (state = roris, action) => {
    switch(action.type) {
    case 'UPDATE_RORIS':
        return action.list;
    default:
        return state;
    }
}

const rori = combineReducers({
    roriDisplay,
    roriList,
    volumes,
})

export default rori;