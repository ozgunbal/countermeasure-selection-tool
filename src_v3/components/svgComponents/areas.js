import React from 'react';

const Areas = ({ areas }) => {
    const [attack, cm] = areas;
    return (
        <g>
            <polygon key={0} points={attack} style={{ ...polygonStyle, fill: "red" }} />
            <polygon key={1} points={cm} style={{ ...polygonStyle, fill: "blue" }} />
        </g>
    )
};

const polygonStyle = { stroke: 'black', strokeWidth: 1, opacity: 0.5 };

export default Areas;