import roriSimulation from '../simulation';
import polySimulation from '../nPolySimulation'
import { combineReducers } from 'redux';
import volumes from './volume';

const roris = roriSimulation.simulation();
const polies = polySimulation.simulation();
const initialSystem = {iv: 4500, aiv: 700};

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

const polygonAreas = (state = polies, action) => {
    switch(action.type) {
    case 'UPDATE_POLIES':
        return action.list;
    default:
        return state;
    }
}

const polyDisplay = (state = polies[0], action) => {
    switch(action.type) {
    case 'CHANGE_DISPLAY_POLY':
        return action.poly;
    default:
        return state;
    }
}

const system = (state = initialSystem, action) => {
    switch(action.type) {
        case 'UPDATE_SYSTEM_VALUES':
            return action.system;
        default:
            return state;
        }
}

const rori = combineReducers({
    roriDisplay,
    roriList,
    volumes,
    polygonAreas,
    polyDisplay,
    system,
})

export default rori;