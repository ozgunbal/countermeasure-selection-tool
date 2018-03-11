const generateRadianAngle = (index, nCount) => (
    (3 * Math.PI / 2) + (index * 2 * Math.PI / nCount)
);

const generateCoordinateFromAngle = (radianAngle, center, length) => ({
    X: center + length * Math.cos(radianAngle),
    Y: center + length * Math.sin(radianAngle),
    rad: radianAngle
})

const calculatePoints = (size, rad) => (
    Array(10).fill(0).map((_, i) => i + 1)
        .map(idx => ({
            X: size * 1.25 + ((size * idx / 10) * Math.cos(rad)),
            Y: size * 1.25 + ((size * idx / 10) * Math.sin(rad)),
        }))
);

export const calculateLines = (size, n) => (
    Array(n).fill(0).map((_, i) => i)
        .map(i => generateRadianAngle(i, n))
        .map(rad => generateCoordinateFromAngle(rad, size * 1.25, size))
        .map(line => ({
            ...line,
            points: calculatePoints(size, line.rad)
        }))
)

export const generatePolygons = (dims, size) => (
    dims.map(polygon => {
        const n = polygon.length
        return Array(n).fill(0).map((_, i) => i)
            .map(i => generateRadianAngle(i, n))
            .map((rad, idx) => generateCoordinateFromAngle(rad, size * 1.25, polygon[idx] * size / 100))
            .reduce((str, point) => {
                str += `${Math.round(point.X)},${Math.round(point.Y)} `;
                return str;
            }, '')
    })
)