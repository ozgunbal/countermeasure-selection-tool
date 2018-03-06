import React from 'react';

const Axes = ({ focus, alpha, rcu }) => {
    const depthX = Math.round(Math.sin(alpha) * rcu.u);
    const depthY = Math.round(Math.cos(alpha) * rcu.u);
    return (
        <g>
            <line x1={focus[0]} y1={focus[1]} x2={focus[0] + rcu.r} y2={focus[1]} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0]} y1={focus[1] - rcu.c} x2={focus[0] + rcu.r} y2={focus[1] - rcu.c} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0] + depthX } y1={focus[1] - rcu.c - depthY} x2={focus[0] + rcu.r + depthX} y2={focus[1] - rcu.c -depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0] + depthX } y1={focus[1] - depthY} x2={focus[0] + rcu.r + depthX} y2={focus[1] - depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line x1={focus[0]} y1={focus[1]} x2={focus[0]} y2={focus[1] - rcu.c} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0] + rcu.r} y1={focus[1]} x2={focus[0] + rcu.r} y2={focus[1] - rcu.c} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0] + rcu.r + depthX} y1={focus[1] - depthY} x2={focus[0] + rcu.r + depthX} y2={focus[1] - rcu.c - depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0] + depthX} y1={focus[1] - depthY} x2={focus[0] + depthX} y2={focus[1] - rcu.c - depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line x1={focus[0]} y1={focus[1]} x2={focus[0] + depthX} y2={focus[1] - depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0]} y1={focus[1] - rcu.c} x2={focus[0] + depthX} y2={focus[1] - rcu.c - depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0] + rcu.r} y1={focus[1] - rcu.c} x2={focus[0] + depthX + rcu.r} y2={focus[1] - rcu.c - depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
            <line strokeDasharray="5, 5" x1={focus[0] + rcu.r} y1={focus[1]} x2={focus[0] + depthX + rcu.r} y2={focus[1] - depthY} style={{ ...lineStyle, strokeWidth: 1 }} />
        </g>
    )
}

const lineStyle = { stroke: "rgb(0,0,0)", strokeWidth: 0.5 };
export default Axes;