import React from 'react';

import Axes from './axes';
import Areas from './areas';
import { generatePolygons } from './svgCalculateUtils';

const Top = ({ size, dims }) => (
    <svg style={{ height: size * 2.5, width: size * 2.5 }}>
        <Axes n={dims[0].length} size={size} />
        <Areas areas={generatePolygons(dims, size)} />
    </svg>
);

export default Top;