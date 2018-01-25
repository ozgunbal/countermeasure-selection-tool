import React, { Component } from 'react';
import { connect } from 'react-redux';

import Simulation from '../../simulation';
import ReactHighcharts from 'react-highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
Highcharts3D(ReactHighcharts.Highcharts);

class Chart extends Component {
    constructor (props) {
        super(props);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.state = {chartType: '3d'}
    }
    buttonHandler (evt) {
        this.setState({chartType: evt.target.value});
    }
    render() {
        const { displayRori, roris } = this.props;
        let chartConfig;

        switch(this.state.chartType){
            case '3d':
                chartConfig = getConfig(displayRori);
                break;
            case 'cov-arc':
                chartConfig = getLineChartConfig(roris);
                break;
            case 'rori-marc':
                chartConfig = bestRORIMaxARC(roris)
                break;
            case 'cov-marc':
                chartConfig = bestCOVMaxARC(roris)
                break;
            case 'rori-mcov':
                chartConfig = bestRORIMinCOV(roris)
                break;
            case 'arc-mcov':
                chartConfig = minARCMinCOV(roris)
                break;
            default:
                chartConfig = {};
                break;
        }
        return (
            <div>
                <div>
                    <button onClick={this.buttonHandler} value ="3d">3D Volume Model</button>
                    <button onClick={this.buttonHandler} value ="cov-arc">COV/ARC</button>
                    <button onClick={this.buttonHandler} value ="rori-marc">Best RORI/Max ARC</button>
                    <button onClick={this.buttonHandler} value ="cov-marc">Best COV/Max ARC</button>
                    <button onClick={this.buttonHandler} value ="rori-mcov">Best RORI/Min COV</button>
                    <button onClick={this.buttonHandler} value ="arc-mcov">Min ARC/Min COV</button>
                </div>
                <ReactHighcharts config={chartConfig} />
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
    }
}

const mapStateToProps = (state) => ({
    displayRori: state.roriDisplay,
    roris: state.roriList,
})

export default connect(
    mapStateToProps
)(Chart);

const getLineChartConfig = (rorilist) => {
    const data2D = rorilist.sort((a, b) => a.arc - b.arc).map(rori => [rori.arc, rori.coverage * 100]);
    const config = {
        title: {
            text: `Coverage / Annual Response Cost`
        },
        xAxis: {
            min: 0,
            title: 'Annual Response Cost (ARC)'
        },
        yAxis: {
            min: 0,
            max: 100,
            title: 'Coverage'
        },
        series: [{
            data: data2D
        }]
    }
    return config;
}

const bestRORIMaxARC = (rorilist) => {
    const findBestRORI = (rorilist, arcLimit) => {
        const filtered = rorilist.filter(rori => rori.arc < arcLimit).map(rori => rori.rori);
        const limit = filtered.length < 1 ? -10 : Math.max(...filtered) 
        return [arcLimit, limit];
    }
    const arcs = rorilist.map(rori => rori.arc);
    const numARC = rorilist.length;
    const minARC = Math.min(...arcs);
    const maxARC = Math.max(...arcs);
    const step = (maxARC - minARC) / numARC
    const ARCLimits = Array(numARC).fill(0).map((_,i) => minARC + i * step);
    
    const data = ARCLimits.map(limit => findBestRORI(rorilist, limit));
    console.log(data);
    const config = {
        title: {
            text: `Best RORI / Maximum ARC Limit`
        },
        xAxis: {
            min: 0,
            title: 'Maximum ARC Limit'
        },
        yAxis: {
            min: -10,
            title: 'Best RORI'
        },
        series: [{
            data: data
        }]
    }
    return config;
}

const bestCOVMaxARC = (rorilist) => {
    const findBestCOV= (rorilist, arcLimit) => {
        const filtered = rorilist.filter(rori => rori.arc < arcLimit).map(rori => rori.coverage * 100);
        const limit = filtered.length < 1 ? 0 : Math.max(...filtered) 
        return [arcLimit, limit];
    }
    const arcs = rorilist.map(rori => rori.arc);
    const roris = rorilist.map(rori => rori.rori);
    const numARC = rorilist.length;
    const minARC = Math.min(...arcs);
    const maxARC = Math.max(...arcs);
    const step = (maxARC - minARC) / numARC
    const ARCLimits = Array(numARC).fill(0).map((_,i) => minARC + i * step);
    
    const data = ARCLimits.map(limit => findBestCOV(rorilist, limit));
    console.log(data);
    const config = {
        title: {
            text: `Best Coverage / Maximum ARC Limit`
        },
        xAxis: {
            min: 0,
            title: 'Maximum ARC Limit'
        },
        yAxis: {
            min: 0,
            max: 100,
            title: 'Best Coverage'
        },
        series: [{
            data: data
        }]
    }
    return config;
}

const bestRORIMinCOV = (rorilist) => {
    const findBestRORI= (rorilist, covLimit) => {
        const filtered = rorilist.filter(rori => rori.coverage > covLimit).map(rori => rori.rori);
        const limit = filtered.length < 1 ? 0 : Math.max(...filtered) 
        return [covLimit * 100, limit];
    }
    const covs = rorilist.map(rori => rori.coverage);
    const numCOV = rorilist.length;
    const minCOV = Math.min(...covs);
    const maxCOV = Math.max(...covs);
    const step = (maxCOV - minCOV) / numCOV;
    const COVLimits = Array(numCOV).fill(0).map((_,i) => minCOV + i * step);
    
    const data = COVLimits.map(limit => findBestRORI(rorilist, limit));
    console.log(data);
    const config = {
        title: {
            text: `Best RORI / Minimum Coverage Limit`
        },
        xAxis: {
            min: 0,
            max: 100,
            title: 'Minimum Coverage Limit'
        },
        yAxis: {
            title: 'Best RORI'
        },
        series: [{
            data: data
        }]
    }
    return config;
}

const minARCMinCOV = (rorilist) => {
    const findMinARC= (rorilist, covLimit) => {
        const filtered = rorilist.filter(rori => rori.coverage > covLimit).map(rori => rori.arc);
        const limit = filtered.length < 1 ? 0 : Math.min(...filtered) 
        return [covLimit * 100, limit];
    }
    const covs = rorilist.map(rori => rori.coverage);
    const numCOV = rorilist.length;
    const minCOV = Math.min(...covs);
    const maxCOV = Math.max(...covs);
    const step = (maxCOV - minCOV) / numCOV;
    const COVLimits = Array(numCOV).fill(0).map((_,i) => minCOV + i * step);
    
    const data = COVLimits.map(limit => findMinARC(rorilist, limit));
    console.log(data);
    const config = {
        title: {
            text: `Min ARC / Minimum Coverage Limit`
        },
        xAxis: {
            min: 0,
            max: 100,
            title: 'Minimum COV Limit'
        },
        yAxis: {
            title: 'Min ARC'
        },
        series: [{
            data: data
        }]
    }
    return config;
}

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

