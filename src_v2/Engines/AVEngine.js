/*// creates intersection volume object
export const volumeIntersection = (volumes) => (
    volumeOperation(intersectSingleAxis, volumes)
);

// creates union volume object
export const volumeUnion = (volumes) => (
    volumeOperation(unionSingleAxis, volumes)
);

// creates difference of two volume objects
export const volumeSubstraction = (volumes) => (
    volumeOperation(subtractSingleAxis, volumes)
);
*/
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
export const subtractSingleAxis = (axes) => {
    if (axes.length !== 2) throw new Error('There are no two axes');
    const rangeArrays = axes.map(getElementRangeFromAxis);
    const difference = rangeArrays[0].filter(rangeIndex => rangeArrays[1].indexOf(rangeIndex) < 0);

    return difference.map(index => {
        const match = rangeArrays[0].indexOf(index)
        if (match > -1) {
            return axes[0][match];
        }
    });
}

// generates intersection of given axes array
export const intersectSingleAxis = (axes) => {
    const rangeArrays = axes.map(getElementRangeFromAxis);
    const sets = rangeArrays.map(rangeArray => new Set(rangeArray));

    const intersection = sets.reduce((prevSet, set) => (
        new Set([...prevSet].filter(element => set.has(element)))
    ));

    return [...intersection].sort().map(index => {
        const match = rangeArrays[0].indexOf(index)
        if (match > -1) {
            return axes[0][match];
        }
    });
}

// generates union of given axes array
export const unionSingleAxis = (axes) => {
    const rangeArrays = axes.map(getElementRangeFromAxis);
    const sets = rangeArrays.map(rangeArray => new Set(rangeArray));

    const union = sets.reduce((prevSet, set) => (
        new Set([...prevSet, ...set])
    ));

    return [...union].sort().map(index => {
        for (let i = 0; i < rangeArrays.length; i++) {
            const match = rangeArrays[i].indexOf(index);
            if (match > -1) {
                return axes[i][match];
            }
        }
    });
}

// calculates coverage countermeasures on attack surface
export const calculateCoverage = (attackVolume, countermeasureVolume) => {
    const intersectVol = calculateVolume(volumeIntersection([attackVolume, countermeasureVolume]));
    const attackVol = calculateVolume(attackVolume);
    return (intersectVol / attackVol) * 100;
}

// generate array of ranges in the volume 
export const generateRanges = volumeObject => {
    const keys = Object.keys(volumeObject);
    return keys.reduce((ranges, key) => {
        ranges[key] = getElementRangeFromAxis(volumeObject[key]);
        return ranges;
    }, {});
}

// according to operation (union or intersection) generates a single volume object
const volumeOperation = (operation, volumes) => {
    const RCU = ['resource', 'channel', 'userAccount'];
    return RCU.reduce((operatedObject, element) => {
        const elements = volumes.map(volume => volume[element]);
        operatedObject[element] = operation(elements);
        return operatedObject;
    }, {});
}

// generates an array of numbers which are rangeIndex'es of the each element 
const getElementRangeFromAxis = (axis) => axis.map(element => element.rangeIndex);*/

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