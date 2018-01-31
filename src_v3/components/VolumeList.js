import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateRoris, changeChart, updateSystem } from '../actions';
import Simulation from '../simulation';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import DimensionTable from './dimensionTable';
import { tableData } from '../DBs/systemDb';

const VolumeList = ({ system, updateRoris, chartLoad, updateSystemVariables }) => {
    const { iv, aiv } = system;
    const changeHandler = (evt) => {
        updateSystemVariables({
            ...system,
            [evt.target.name]: evt.target.value
        });
        const list = Simulation.infraUpdate(Number(iv), Number(aiv));
        updateRoris(list);
        chartLoad(list[0]);
    }
    return (
        <Jumbotron style={{ marginLeft: "12%", marginRight: "12%", borderRadius: 10, padding: 0 }} onChange={changeHandler}>
            <Row className="show-grid">
                <Col xs={6} xsOffset={5}><h4><strong>System</strong></h4></Col>
            </Row>
            <Row className="show-grid">
                <Col xs={6} xsOffset={3}>
                    <div>Complete System Infrastructure Value: {iv}</div>
                    <input name="iv" type="range" min="1000" max="10000" step="500" defaultValue={iv} />
                </Col>
            </Row>
            <Row className="show-grid" style={{ marginBottom: 15 }}>
                <Col xs={6} xsOffset={3}>
                    <div>Annual Infrastructure Value: {aiv}</div>
                    <input name="aiv" type="range" min="0" max="1000" step="50" defaultValue={aiv}/>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={8} xsOffset={2}>
                    <DimensionTable system={tableData} />
                </Col>
            </Row>
        </Jumbotron>
    );
};

const mapStateToProps = state => ({
    system: state.system,
});


const mapDispatchToProps = (dispatch) => ({
    updateRoris: (list) => dispatch(updateRoris(list)),
    chartLoad: (rori) => dispatch(changeChart(rori)),
    updateSystemVariables: system => dispatch(updateSystem(system)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VolumeList);