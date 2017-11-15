import React from 'react';
import { connect } from 'react-redux';

import Simulation from '../simulation';
import ReactHighcharts from 'react-highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
Highcharts3D(ReactHighcharts.Highcharts);

const Chart = ({ displayRori }) => (
    <div style={{ width: '75%' }}>
        <ReactHighcharts config={getConfig(displayRori)} />
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '15px'
        }}>
            <div style={{ color: 'red' }}><b>Attacked Units</b> </div>
            <div style={{ color: 'blue' }}><b>Countermeasured Units</b> </div>
            <div style={{ color: 'purple' }}><b>Covered Units</b></div>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    displayRori: state.roriDisplay
})

export default connect(
    mapStateToProps
)(Chart);

const getConfig = (rori) => {
    const tempConfig = Object.assign(config);
    tempConfig.title.text = `Attack Coverage of ${rori.code}`
    tempConfig.subtitle.text = `Coverage: ${(rori.coverage * 100).toFixed(2)}% `;
    tempConfig.xAxis.max = Simulation.chartLimits.resource;
    tempConfig.yAxis.max = Simulation.chartLimits.channel;
    tempConfig.zAxis.max = Simulation.chartLimits.userAccount;
    tempConfig.series = [
        {
            name: 'Attack',
            color: 'red',
            data: rori.scatterRanges.onlyAttack,
        },
        {
            name: 'Countermeasure',
            color: 'blue',
            data: rori.scatterRanges.onlyCM
        },
        {
            name: 'Coverage',
            color: 'purple',
            data: rori.scatterRanges.coverage
        }
    ]
    return tempConfig;
}

const config = {
    chart: {
        margin: 100,
        type: 'scatter3d',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 20,
            depth: 250,
            viewDistance: 3,
            fitToPlot: false,
            frame: {
                bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                side: { size: 1, color: 'rgba(0,0,0,0.06)' }
            }
        }
    },
    title: {
        text: `Attack Coverage of `
    },
    subtitle: {
        text: `Coverage: `
    },
    plotOptions: {
        scatter: {
            width: 10,
            height: 10,
            depth: 10
        }
    },
    xAxis: {
        min: 1,
        max: 10,
        title: 'Resource'
    },
    yAxis: {
        min: 1,
        max: 10,
        title: 'Channel'
    },
    zAxis: {
        min: 1,
        max: 10,
        title: 'User Account'
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Attack',
        color: 'red',
        data: []
    },
    {
        name: 'Countermeasure',
        color: 'blue',
        data: []
    },
    {
        name: 'Coverage',
        color: 'purple',
        data: []
    }]
};

