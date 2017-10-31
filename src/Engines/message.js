export const generateVolumeObject = (volumeString, systemVolume) => {
    if (!isValid) throw Error('Invalid volume');

    const rcuMap = [
        { key: 'resource', match: 'R' },
        { key: 'channel', match: 'C' },
        { key: 'userAccount', match: 'U' },
    ];

    return rcuMap.reduce((volumeObject, rcuElement) => {
        const elemString = volumeString.match(`${rcuElement.match}\\(([^\\)]+)\\)`)[1];
        const indexArray = getRangeIndexArray(elemString);

        volumeObject[rcuElement.key] = getAxisObjectFromRanges(indexArray, systemVolume[rcuElement.key]);
        return volumeObject;
    }, {});
}

// NOT TESTED !!
export const generateRanges = (volumeString, systemVolume) => {
    if (!isValid) throw Error('Invalid volume');

    const rcuMap = [
        { key: 'resource', match: 'R' },
        { key: 'channel', match: 'C' },
        { key: 'userAccount', match: 'U' },
    ];

    return rcuMap.reduce((volumeObject, rcuElement) => {
        const elemString = volumeString.match(`${rcuElement.match}\\(([^\\)]+)\\)`)[1];
        const indexArray = getRangeIndexArray(elemString);

        volumeObject[rcuElement.key] = indexArray;
        return volumeObject;
    }, {});
}

export const getScatterPoints = ranges => {
    const points = [];
    for(let i = 0; i < ranges.resource.length; i++){
        for(let j = 0; j < ranges.channel.length; j++){
            for(let k = 0; k < ranges.userAccount.length; k++){
                points.push([ranges.resource[i], ranges.channel[j], ranges.userAccount[k]]);
            }
        }
    }
    return points;
}

export const isValid = (volumeString) => /R\((\d+([,-]\d+)|\d+)(,(\d+([,-]\d+)|\d+))*\)C\((\d+([,-]\d+)|\d+)(,(\d+([,-]\d+)|\d+))*\)U\((\d+([,-]\d+)|\d+)(,(\d+([,-]\d+)|\d+))*\)/.test(volumeString);

const getAxisObjectFromRanges = (range, systemAxis) => {
    return systemAxis.filter(element => range.indexOf(element.rangeIndex) > -1)
}

// NOT TESTED !!
const getAxisDataPointsFromRanges = (range, systemAxis) => {
    let dataPoints = [];
    let count = 1;
    for(let i = 0; i < systemAxis.length; i++) {
        const currentWeight = systemAxis[i].weight; 
        const currentRange = systemAxis[i].rangeIndex;
        if(range.indexOf(currentRange) > -1) {
            //dataPoints = [...dataPoints, ...Array(currentWeight).keys().map(key => key + count)];
            dataPoints = [...dataPoints, ...Array.apply(null, Array(currentWeight)).map((_, i) => i + count)];
            
        }
        count += currentWeight;
    }
    return dataPoints;
};

const getRangeIndexArray = (elementString) => {
    const separetedElements = elementString.split(',')
    let elementArray = [];
    separetedElements.forEach(rangeString => {
        const range = rangeString.split('-');
        if (range.length !== 1) {
            const arr = getRangeArray(Number(range[0]), Number(range[1]));
            elementArray = [...elementArray, ...arr];
        } else {
            elementArray.push(Number(range[0]));
        }
    });

    return elementArray.sort();
}

// returns array of consecutive numbers with start and end point
const getRangeArray = (start, end) => {
    const diff = end - start + 1;
    if (diff < 1) throw Error('Zero or negative range');
    return Array.from(Array(diff).keys()).map(x => x + start);
}