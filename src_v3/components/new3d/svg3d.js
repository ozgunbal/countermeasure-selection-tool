import React from 'react';
import Axes from './axes';

const SVG3D = () => {
    const alpha = Math.PI / 5;
    const systemRcu = { r: 240, c: 150, u: 200 };
    const height = systemRcu.c + Math.round(Math.cos(alpha) * systemRcu.u);
    const width = systemRcu.r + Math.round(Math.sin(alpha) * systemRcu.u);
    const axisFocus = [0, height, 0];
    return (
        <svg style={{ height: height, width: width, margin: 10 }}>
            <Axes focus={axisFocus} alpha={alpha} rcu={systemRcu} />
        </svg>
    )
};

const polygonStyle = { stroke: 'black', strokeWidth: 1, opacity: 0.5 };

export default SVG3D;