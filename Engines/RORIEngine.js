import roriDb from '../DBs/roriDb.json';

// check is there a RORI Index in the database
const isHaveRORIIndex = (countermeasureCode) => {
    const db = JSON.parse(roriDb);
    return db.hasOwnProperty(countermeasureCode);
}

//
const calculateRORIIndex = () => {
    // get AIV from -> System specific
    System.getAIV();
    // get ALE -> Attack
    Attack.getALE();
    // get ARC -> CM
    Countermeasure.getARC();
    // get RM -> CM
    Countermeasure.getRM();

    //whenever is calculated from zero register to the database
}

const getRORIIndex = () => {
    if (isHaveRORIIndex(countermeasureCode)) {
        return JSON.parse(roriDb)[countermeasureCode];
    }
    return calculateRORIIndex();
}