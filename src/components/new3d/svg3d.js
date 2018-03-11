import React, { Component } from 'react';
import Axes from './axes';
import Prism from './prism';

class SVG3D extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, alpha: Math.PI / 2.5 };
        this.handleResize = this.handleResize.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    handleResize(evt) {
        const width = window.innerWidth * 0.6 < 500 ? window.innerWidth * 0.6 : 500;
        this.setState({ width: width })
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }
    changeHandler (evt) {
        this.setState({ alpha: Math.PI / evt.target.value })
    }
    render() {
        /*
Change Alpha with scrollbar
 */
        const { width, alpha } = this.state;  //Math.PI / 4.5; /*range: 2.5-5*/
        const { drawParameters, code, coverage } = this.props.display;
        const {
            systemRcu,
            axisFocus,
            attack,
            cm,
            height,
        } = getScaledLengths(width, alpha, drawParameters);
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h4>Attack Coverage of {code}</h4>
                    <h5>Coverage: {coverage.toFixed(2)}% </h5>
                </div>
                <svg style={{ height: height, width: width + 10, display: 'block', margin: '10px auto' }}>
                    <Axes focus={axisFocus} alpha={alpha} rcu={systemRcu} />
                    {
                        attack.map(({ focus, edges }) =>
                            <Prism focus={[axisFocus[0] + focus[0], axisFocus[1] - focus[1], axisFocus[2] + focus[2]]} alpha={alpha} edges={edges} color="red" />
                        )
                    }
                    {
                        cm.map(({ focus, edges }) =>
                            <Prism focus={[axisFocus[0] + focus[0], axisFocus[1] - focus[1], axisFocus[2] + focus[2]]} alpha={alpha} edges={edges} color="blue" />
                        )
                    }
                </svg>
                <div style={{width: width, margin: '10px auto'}}>
                    <div style={{textAlign: 'center'}}>View Angle</div>
                    <input name="alpha" type="range" min="2.3" max="5" step="0.1" defaultValue={2.5} onChange={this.changeHandler}/>
                </div>
            </div>
        )
    }
}

const polygonStyle = { stroke: 'black', strokeWidth: 1, opacity: 0.5 };
const getScaledLengths = (elementWidth, alpha, draw) => {
    let width = draw.systemRcu.r + Math.round(Math.sin(alpha) * draw.systemRcu.u);
    const scaleFactor = elementWidth / width;
    const height = Math.round(scaleFactor * (draw.systemRcu.c + Math.cos(alpha) * draw.systemRcu.u));
    width = elementWidth;
    const systemRcu = Object.entries(draw.systemRcu).reduce((scaled, [key, length]) => {
        scaled[key] = Math.round(scaleFactor * length);
        return scaled;
    }, {});
    const attack = draw.attack.map(({ focus, edges }) => ({
        focus: focus.map(length => Math.round(scaleFactor * length)),
        edges: edges.map(edge => Math.round(scaleFactor * edge)),
    }))
    const cm = draw.cm.map(({ focus, edges }) => ({
        focus: focus.map(length => Math.round(scaleFactor * length)),
        edges: edges.map(edge => Math.round(scaleFactor * edge)),
    }));
    const axisFocus = [0, height, 0];
    return {
        systemRcu,
        axisFocus,
        attack,
        cm,
        width,
        height,
    };
}

export default SVG3D;