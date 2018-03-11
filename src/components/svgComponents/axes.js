import React from 'react';
import { calculateLines } from './svgCalculateUtils';

const Axes = ({ size, n }) => {
    const lines = calculateLines(size, n);
    return (
        <g>
            {
                lines.map(({ X, Y, points, rad }, idx) => (
                    <g>
                        <line x1={size * 1.25} y1={size * 1.25} x2={X} y2={Y} style={lineStyle} />
                        {
                            points.map(({ X, Y },idx) => <line key = {idx} x1={X + 5 * Math.sin(rad)} y1={Y - 5 * Math.cos(rad)} x2={X - 5 * Math.sin(rad)} y2={Y + 5 * Math.cos(rad)} style={lineStyle} />)
                        }
                        <text x={X + 15 * Math.cos(rad)} y={Y + 15 * Math.sin(rad)}>100</text>
                    </g>
                )
                )}
        </g>
    )
}

const lineStyle = {stroke:"rgb(0,0,0)", strokeWidth:1};

export default Axes;