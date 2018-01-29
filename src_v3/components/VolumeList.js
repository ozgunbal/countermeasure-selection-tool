import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateRoris, changeChart } from '../actions';
import Simulation from '../simulation';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import DimensionTable from './dimensionTable';
import { tableData } from '../DBs/systemDb';

class VolumeList extends Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            iv: 4500,
            aiv: 700
        }
    }
    changeHandler(evt) {
        this.setState({ [evt.target.name]: evt.target.value }, () => {
            const { iv, aiv } = this.state;
            const list = Simulation.infraUpdate(Number(iv), Number(aiv));
            this.props.updateRoris(list);
            this.props.chartLoad(list[0]);
        });
    }
    render() {
        const { iv, aiv } = this.state;
        return (
            <Jumbotron style={{ marginLeft: "12%", marginRight: "12%", borderRadius: 10, padding: 0 }}>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={5}><h4><strong>System</strong></h4></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={3}>
                        <div>Complete System Infrastructure Value: {iv}</div>
                        <input name="iv" type="range" min="1000" max="10000" step="500" value={iv} onChange={this.changeHandler} />
                    </Col>
                </Row>
                <Row className="show-grid" style={{ marginBottom: 15 }}>
                    <Col xs={6} xsOffset={3}>
                        <div>Annual Infrastructure Value: {aiv}</div>
                        <input name="aiv" type="range" min="0" max="1000" step="50" value={aiv} onChange={this.changeHandler} />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={8} xsOffset={2}>
                        <DimensionTable system={tableData} />
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    updateRoris: (list) => dispatch(updateRoris(list)),
    chartLoad: (rori) => dispatch(changeChart(rori))
})

export default connect(
    null,
    mapDispatchToProps,
)(VolumeList);