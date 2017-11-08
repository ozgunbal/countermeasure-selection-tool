export const generateScatterVolume = (volumeString, systemVolume) => {
    const ranges = generateRanges(volumeString);
    return getRCUScatterPointsWithVolume(ranges, systemVolume);
}

// NOT TESTED !!
export const generateRanges = volumeString => {
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

export const getScatterPoints = volume => {
    return volume.map(unit => [unit.resourceIdx, unit.channelIdx, unit.userAccountIdx]);
}