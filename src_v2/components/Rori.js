import React from 'react';
import { connect } from 'react-redux';

import { changeChart } from '../actions';

const Rori = ({ roriData, chartLoad }) => (
    <div>
        { `Countermeasure: ${roriData.code} RORI Index: ${(roriData.rori).toFixed(3)} Coverage: ${(roriData.coverage * 100).toFixed(2)}%`}
        <button onClick={() => chartLoad(roriData)}>Show</button>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    chartLoad: (rori) => dispatch(changeChart(rori))
})

export default connect(
    null,
    mapDispatchToProps
)(Rori);