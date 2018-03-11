import React from 'react';
import { generateLinePoints, generatePolygonPoints } from './utils';

const Prism = ({ focus, alpha, edges, color }) => {
    const focus2D = [
        focus[0] + Math.round(Math.sin(alpha) * focus[2]),
        focus[1] - Math.round(Math.cos(alpha) * focus[2])
    ];
    const polyPoints = generatePolygonPoints(focus2D, alpha, edges);
    const linePoints = generateLinePoints(focus2D, alpha, edges);
    return (
        <svg>
            <g>
                <polygon points={polyPoints} style={{ opacity: 0.5, fill: color, stroke: "rgb(0,0,0)", strokeWidth: 1.5 }} />
                {
                    linePoints.map(p => (
                        <line x1={p.X1} y1={p.Y1} x2={p.X2} y2={p.Y2} style={lineStyle} />
                    ))
                }
            </g>
        </svg>
    )
}

const lineStyle = {stroke:"rgb(0,0,0)", strokeWidth:0.5};

export default Prism;