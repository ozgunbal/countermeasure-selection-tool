import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axes from './axes';
import Areas from './areas';
import { generatePolygons } from './svgCalculateUtils';

class PolyGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {size: 200};
    }
    componentDidMount() {
        this.setState({size: this.myInput.clientWidth});
    }
    render() {
        const { code, dims } = this.props;
        const { size } = this.state;
        return (
            <div ref={input => {this.myInput = input}}>
                <h3 style={{marginLeft: '20%'}}>Countermeasure: {code}</h3>
                <svg style={{ height: size * 0.7887, width: size }}>
                    <Axes n={dims[0].length} size={size / 2.5} />
                    <Areas areas={generatePolygons(dims, size / 2.5)} />
                </svg>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    dims: [state.polyDisplay.attack, state.polyDisplay.cm],
    code: state.polyDisplay.code,
});

export default connect(
    mapStateToProps
)(PolyGraph);