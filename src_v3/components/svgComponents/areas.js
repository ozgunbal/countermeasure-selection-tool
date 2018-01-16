import React from 'react';

const Areas = ({ areas }) => (
    <g>
        {
            areas.map((area, i) =>
                <polygon key={i} points={area} style={{ ...polygonStyle, fill: `rgb(${i * 60} ,45, 100)` }} />
            )
        }
    </g>
);

const polygonStyle = { stroke: 'black', strokeWidth: 1, opacity: 0.5 };

export default Areas;