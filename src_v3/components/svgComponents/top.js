import React from 'react';
import { connect } from 'react-redux';

import Axes from './axes';
import Areas from './areas';
import CMList from './cmlist';
import { generatePolygons } from './svgCalculateUtils';

const Top = ({ size, dims, code }) => (
    <div>
        <h2>Countermeasure: {code}</h2>
        <svg style={{ height: size * 2.5, width: size * 2.5 }}>
            <Axes n={dims[0].length} size={size} />
            <Areas areas={generatePolygons(dims, size)} />
        </svg>
        <CMList />
    </div>
);

const mapStateToProps = (state) => ({
    dims: [state.polyDisplay.attack, state.polyDisplay.cm],
    code: state.polyDisplay.code
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Top);