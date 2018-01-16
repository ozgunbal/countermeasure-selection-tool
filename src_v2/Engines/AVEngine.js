// calculates numeric value from volume object
export const calculateVolume = (volume) => {
    const resourceAxis = calculateSingleAxis(volume.resource);
    const channelAxis = calculateSingleAxis(volume.channel);
    const userAccountAxis = calculateSingleAxis(volume.userAccount);

    return resourceAxis * channelAxis * userAccountAxis;
}

// sums of all the elements' weight in an axis
export const calculateSingleAxis = (axisElements) => (
    axisElements.reduce((axisLength, element) => axisLength + element.weight, 0)
)
/*
V2
 */
export const calculateVolumeWithScatter = scatterVolume => {
    return scatterVolume.reduce((totalVolume, point) => totalVolume + point.unitVolume, 0);
}

const getMapNumbers = volume => {
    return volume.map(unit => unit.resourceIdx * 100 * 100 + unit.channelIdx * 100 + unit.userAccountIdx);
}

export const volumeUnionScatter = scatterVolumes => {
    const mapNumberArrays = scatterVolumes.map(getMapNumbers);
    const sets = mapNumberArrays.map(mapNumberArray => new Set(mapNumberArray));
    const union = sets.reduce((prevSet, set) => (
        new Set([...prevSet, ...set])
    ));
    return [...union].sort().map(index => {
        for (let i = 0; i < mapNumberArrays.length; i++) {
            const match = mapNumberArrays[i].indexOf(index);
            if (match > -1) {
                return scatterVolumes[i][match];
            }
        }
    });
};

export const volumeIntersectionScatter = scatterVolumes => {
    const mapNumberArrays = scatterVolumes.map(getMapNumbers);
    const sets = mapNumberArrays.map(mapNumberArray => new Set(mapNumberArray));
    const intersection = sets.reduce((prevSet, set) => (
        new Set([...prevSet].filter(element => set.has(element)))
    ));
    return [...intersection].sort().map(index => {
        const match = mapNumberArrays[0].indexOf(index)
        if (match > -1) {
            return scatterVolumes[0][match];
        }
    });
};

export const volumeSubtractionScatter = scatterVolumes => {
    if (scatterVolumes.length !== 2) throw new Error('There are no two axes');
    const mapNumberArrays = scatterVolumes.map(getMapNumbers);
    const difference = mapNumberArrays[0].filter(mapNumber => mapNumberArrays[1].indexOf(mapNumber) < 0);

    return difference.map(index => {
        const match = mapNumberArrays[0].indexOf(index)
        if (match > -1) {
            return scatterVolumes[0][match];
        }
    });
}

export const calculateScatterCoverage = (attackVolume, countermeasureVolume) => {
    const intersectVol = calculateVolumeWithScatter(volumeIntersectionScatter([attackVolume, countermeasureVolume]));
    const attackVol = calculateVolumeWithScatter(attackVolume);
    return (intersectVol / attackVol) * 100;
}