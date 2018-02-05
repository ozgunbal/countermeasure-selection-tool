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