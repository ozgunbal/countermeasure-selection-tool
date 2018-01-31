export const changeChart = rori => ({
    type: 'CHANGE_DISPLAY_RORI',
    rori
});

export const addAttack = attack => ({
    type: 'ADD_ATTACK',
    attack
})

export const addCountermeasure = countermeasure => ({
    type: 'ADD_COUNTERMEASURE',
    countermeasure
});

export const updateRoris = list => ({
    type: 'UPDATE_RORIS',
    list
});

export const changeDisplayPoly = poly => ({
    type: 'CHANGE_DISPLAY_POLY',
    poly
});

export const updatePolies = list => ({
    type: 'UPDATE_POLIES',
    list
});

export const updateSystem = system => ({
    type: 'UPDATE_SYSTEM_VALUES',
    system
});
