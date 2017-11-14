export const changeChart = (rori) => {
    return {
        type: 'CHANGE_DISPLAY_RORI',
        rori
    };
}

export const addAttack = (attack) => {
    return {
        type: 'ADD_ATTACK',
        attack
    };
}

export const addCountermeasure = (countermeasure) => {
    return {
        type: 'ADD_COUNTERMEASURE',
        countermeasure
    };
}

export const updateRoris = (list) => {
    return {
        type: 'UPDATE_RORIS',
        list
    }
};
