export const getDimensions = (display, system) => {
    return Object.keys(system).reduce((dims, key) => {
        dims.push(
            calculateSingleDimension(display[key], system[key])
        )
        return dims;
    }, []);
}

const calculateSingleDimension = (displayAxis, systemAxis) => (
    100 * calculateSingleAxis(displayAxis) / calculateSingleAxis(systemAxis)
);

// sums of all the elements' weight in an axis
export const calculateSingleAxis = (axisElements) => (
    axisElements.reduce((axisLength, element) => axisLength + element.weight, 0)
)

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

// generates an array of numbers which are rangeIndex'es of the each element 
const getElementRangeFromAxis = (axis) => axis.map(element => element.rangeIndex);
