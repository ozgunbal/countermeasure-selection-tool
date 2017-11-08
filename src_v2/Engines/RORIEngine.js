// import roriDb from '../DBs/roriDb';

// check is there a RORI Index in the database
const isHaveRORIIndex = (countermeasureCode) => {
    const db = JSON.parse(roriDb);
    return db.hasOwnProperty(countermeasureCode);
}

//
export const calculateRORIIndex = (system, attack, countermeasure) => {
    const aiv = system.getAIV();
    const ale = attack.getALE();
    const arc = countermeasure.getARC();
    const rm = countermeasure.getRM(attack.getVolumeObject());

    return ((ale * rm) - arc) / (arc + aiv);
}

export const getCombinations = (countermeasureArray) => {
    if (countermeasureArray.length < 2) {
        return countermeasureArray;
    }
    return countermeasureArray.reduce((combinations, cm, idx) => {
        combinations.push([cm]);
        const rest = getCombinations(countermeasureArray.slice(idx + 1))
            .map(combination => Array.isArray(combination) ? [cm, ...combination] : [cm, combination]);
        if (rest.length > 0) combinations.push(...rest);
        return combinations;
    }, [])
};

const getRORIIndex = (system, attack, countermeasure) => {
    if (isHaveRORIIndex(countermeasureCode)) {
        return JSON.parse(roriDb)[countermeasureCode];
    }
    const rori = calculateRORIIndex(system, attack, countermeasure);

    // TODO: add rori to database with countermeasureCode
    return rori;
}