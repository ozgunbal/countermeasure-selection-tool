import { combineReducers } from 'redux';
import countermeasureInfo from '../DBs/counterMeasureDb';
import attackInfo from '../DBs/attackDb';

const attacks = (state = attackInfo, action) => {
    switch(action.type){
    case 'ADD_ATTACK':
        return [
            ...state,
            action.attack
        ];
    case 'DELETE_ATTACK':
        return [
            ...state.slice(0, action.id),
            ...state.slice(action.id + 1)
        ];
    default:
        return state;
    }
}

const countermeasures = (state = countermeasureInfo, action) => {
    switch(action.type){
    case 'ADD_COUNTERMEASURE':
        return [
            ...state,
            action.countermeasure
        ];
    case 'DELETE_COUNTERMEASURE':
        return [
            ...state.slice(0, action.id),
            ...state.slice(action.id + 1)
        ];
    default:
        return state;
    }
}

const volumes = combineReducers({
    attacks,
    countermeasures
})

export default volumes;