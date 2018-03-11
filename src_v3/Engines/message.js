// For RCU Scatter type Volume representation
export const generateScatterVolume = (volumeString, systemVolume) => {
    const ranges = generateRanges(volumeString);
    return getRCUScatterPointsWithVolume(ranges, systemVolume);
}

// For Volume Object representation
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

// For RCU Scatter type Volume representation
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

export const getScatterPoints = volume => {
    return volume.map(unit => [unit.resourceIdx, unit.channelIdx, unit.userAccountIdx]);
}

// generates RCU scatter points from string
export const getRCUScatterPoints = ranges => {
    const points = [];
    for(let i = 0; i < ranges.resource.length; i++){
        for(let j = 0; j < ranges.channel.length; j++){
            for(let k = 0; k < ranges.userAccount.length; k++){
                points.push({
                    resource: ranges.resource[i],
                    channel: ranges.channel[j],
                    userAccount: ranges.userAccount[k]
                });
            }
        }
    }
    return points;
}

// generates RCU scatter points from ranges array and system volume
export const getRCUScatterPointsWithVolume = (ranges, systemVolume) => {
    const points = [];
    for(let i = 0; i < ranges.resource.length; i++){
        for(let j = 0; j < ranges.channel.length; j++){
            for(let k = 0; k < ranges.userAccount.length; k++){
                const resourceIdx = ranges.resource[i];
                const channelIdx =  ranges.channel[j];
                const userAccountIdx = ranges.userAccount[k];
                const unitVolume = systemVolume.resource[resourceIdx - 1].weight * systemVolume.channel[channelIdx - 1].weight * systemVolume.userAccount[userAccountIdx - 1].weight;
                points.push({
                    resourceIdx,
                    channelIdx,
                    userAccountIdx,
                    unitVolume
                });
            }
        }
    }
    return points;
}

/**
 * Calculates draw parameters of volume wrt focus point in 3D space
 * @param {String} volumeString R(1)C(1-2)U(2-5) 
 * @param {Object} systemVolume 
 * @return {Object} {focus: [0, 20, 0], edges: [10, 30, 40]}
 */
export const getVolumeDrawParameters = (volumeString, systemVolume) => (
    Object.entries(generateRanges(volumeString)).reduce((draw,[key, range]) => {
        const lastElement = range[range.length - 1];
        const firstElement = range[0];
        let focus = 0;
        let edge = 0;
        for (let i = 1; i<= lastElement; i++) {
            if(i < firstElement) {
                focus += systemVolume[key][i - 1].weight;
            } else {
                edge += systemVolume[key][i - 1].weight;
            }
        }
        return {
            focus : [...draw.focus, focus],
            edges: [...draw.edges, edge],
        }
    }, {
        focus : [],
        edges: []
    })
);