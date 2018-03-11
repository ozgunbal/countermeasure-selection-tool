export const generatePolygonPoints = (focus, alpha, edges) => {
    let StringPoints = "";
    let CurX = focus[0];
    let CurY = focus[1];
    StringPoints += `${CurX},${CurY} `;
    CurY -= edges[1];
    StringPoints += `${CurX},${CurY} `;
    CurX += Math.round(Math.sin(alpha) * edges[2]);
    CurY -= Math.round(Math.cos(alpha) * edges[2]);
    StringPoints += `${CurX},${CurY} `;
    CurX += edges[0];
    StringPoints += `${CurX},${CurY} `;
    CurY += edges[1];
    StringPoints += `${CurX},${CurY} `;
    CurX -= Math.round(Math.sin(alpha) * edges[2]);
    CurY += Math.round(Math.cos(alpha) * edges[2]);
    StringPoints += `${CurX},${CurY}`;
    return StringPoints;
}

export const generateLinePoints = (focus, alpha, edges) => {
    const focusOne = [
        focus[0] + Math.round(Math.sin(alpha) * edges[2]),
        focus[1] - Math.round(Math.cos(alpha) * edges[2]),
    ]
    const focusTwo = [
        focus[0] + edges[0],
        focus[1] - edges[1],
    ];
    const point = [
        { X1: focusOne[0], Y1: focusOne[1], X2: focusOne[0] + edges[0], Y2: focusOne[1] },
        { X1: focusOne[0], Y1: focusOne[1], X2: focusOne[0], Y2: focusOne[1] - edges[1] },
        { X1: focusOne[0], Y1: focusOne[1], X2: focus[0], Y2: focus[1] },
        { X1: focusTwo[0], Y1: focusTwo[1], X2: focusTwo[0] - edges[0], Y2: focusTwo[1] },
        { X1: focusTwo[0], Y1: focusTwo[1], X2: focusTwo[0], Y2: focusTwo[1] + edges[1] },
        { X1: focusTwo[0], Y1: focusTwo[1], X2: focusTwo[0] + Math.round(Math.sin(alpha) * edges[2]), Y2: focusTwo[1] - Math.round(Math.cos(alpha) * edges[2]) },
    ];
    return point;
}