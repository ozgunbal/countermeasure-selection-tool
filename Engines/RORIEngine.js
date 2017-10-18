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

const getCombinations = (countermeasureArray) => {
    // TODO: refactor
    const arr = countermeasureArray;

    if (arr.length === 1 || arr.length === 0) {
        return arr;
    }

    var [first, ...rest] = arr;

    return arr.reduce(function (acc, curr, idx, ar) {
        acc.push([curr]);
        var others = comb(ar.slice(idx + 1)).map(function (co) {
            if (Array.isArray(co)) {
                return [curr, ...co];
            } else {
                return [curr, co];
            }
        })
        if (others.length > 0) acc.push(...others);

        return acc;
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