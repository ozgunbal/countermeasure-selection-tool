import React from 'react';
import { connect } from 'react-redux';

import { changeChart } from '../actions';

const Rori = ({ roriData, chartLoad }) => (
    <div style ={{
        width: '70%', 
        display: 'flex', 
        alignContent: 'center',
        border: '1px solid black',
        borderRadius: '5px',
        fontSize: '80%',
        fontFamily: 'sans-serif',
        color: 'darkblue',
        margin: '10px'
        }}>
        <span style = {{width: '40%'}}>{`Countermeasure: ${roriData.code} `}</span> 
        <span style = {{width: '25%'}}>{`RORI Index: ${(roriData.rori).toFixed(3)}`}</span>
        <span style = {{width: '25%'}}>{` Coverage: ${(roriData.coverage * 100).toFixed(2)}%`}</span>
        <button style = {{width: '10%'}} onClick={() => chartLoad(roriData)}>Show</button>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    chartLoad: (rori) => dispatch(changeChart(rori))
})

export default connect(
    null,
    mapDispatchToProps
)(Rori);