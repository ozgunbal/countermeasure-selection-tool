import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import ReactHighcharts from 'react-highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
Highcharts3D(ReactHighcharts.Highcharts);

import { getCharts } from '../../reducers/chart';

const Chart = ({ charts }) => (
    <Tabs
        defaultActiveKey={1}
        animation={false}
        id="uncontrolled-tab-example"
    >
        <Tab eventKey={1} title="3D Volume Model">
            <ReactHighcharts config={charts[0]} />
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '15px'
            }}>
                <div style={{ color: 'red' }}><b>Attacked Units</b> </div>
                <div style={{ color: 'blue' }}><b>Countermeasured Units</b> </div>
                <div style={{ color: 'purple' }}><b>Covered Units</b></div>
            </div>
        </Tab>
        {
            charts.slice(1).map((chart, idx) => (
                <Tab eventKey={idx + 2} title={chart.title.text}>
                    <ReactHighcharts config={charts[idx + 1]} />
                </Tab>
            ))
        }
    </Tabs>
);

const mapStateToProps = (state) => ({
    charts: getCharts(state)
})

export default connect(
    mapStateToProps
)(Chart);