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
    default:
        return state;
    }
}

const volumes = combineReducers({
    attacks,
    countermeasures
})

export default volumes;