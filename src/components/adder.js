import React from 'react';
import { connect } from 'react-redux';

import {
    addAttack,
    updateRoris,
    changeChart,
    addCountermeasure,
    updatePolies,
    changeDisplayPoly,
    deleteAttack,
    deleteCountermeasure,
} from '../actions';
import Simulation from '../simulation';
import nPolySimulation from '../nPolySimulation';
import { Button, Jumbotron, FormControl, Row, Col, Label, Well } from 'react-bootstrap';
import attack from '../models/attack';

class Adder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleAttackAdd = this.handleAttackAdd.bind(this);
        this.handleCountermeasureAdd = this.handleCountermeasureAdd.bind(this);
        this.handleAttackDelete = this.handleAttackDelete.bind(this);
        this.handleCountermeasureDelete = this.handleCountermeasureDelete.bind(this);
        this.update = false;
    }
    handleAttackAdd() {
        const { attackRcu, attackCode, aro } = this.state;
        this.props.addAttackVolume({
            rcu: attackRcu,
            code: attackCode,
            aro,
        });
        this.update = true;
    }
    handleAttackDelete(attackIndex) {
        this.props.deleteAttackVolume(attackIndex);
        this.update = true;
    }
    handleCountermeasureAdd() {
        const { cmRcu, cmCode, ef } = this.state;
        this.props.addCountermeasureVolume({
            rcu: cmRcu,
            code: cmCode,
            ef,
        });
        this.update = true;
    }
    handleCountermeasureDelete(countermeasureIndex) {
        this.props.deleteCountermeasureVolume(countermeasureIndex);
        this.update = true;
    }
    handleChange(evt) {
        if (evt.target.name === "aro" || evt.target.name === "ef") {
            const value = Number(evt.target.value)
            this.setState({ [evt.target.name]: value });
        } else {
            this.setState({ [evt.target.name]: evt.target.value });
        }
    }
    componentDidUpdate() {
        if (this.update) {
            const list = Simulation.update(this.props.attacks, this.props.countermeasures);
            const polyList = nPolySimulation.update(this.props.attacks, this.props.countermeasures);
            this.props.updateRoris(list);
            this.props.chartLoad(list[0]);
            this.props.updatePolyList(polyList);
            this.props.changePolyDisplay(polyList[0]);
            this.update = false;
        }
    }
    render() {
        return (
            <Jumbotron style={{ marginLeft: "12%", marginRight: "12%", borderRadius: 10, padding: 0 }}>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={5}><h4><strong>Attacks</strong></h4></Col>
                </Row>
                {
                    this.props.attacks.map((attack, i) =>
                        <Row key={i} className="show-grid">
                            <Col xs={4} xsOffset={4} style={{display: "flex"}}>
                                <Well style={{margin: 3, padding: 3, alignContent: "space-between"}}  bsSize="small">
                                <Label>{attack.code}</Label> {attack.rcu} <Button bsSize="small" onClick={() => this.handleAttackDelete(i)}>Delete</Button>
                                </Well>
                            </Col>
                        </Row>
                    )
                }
                <Row className="show-grid" onChange={this.handleChange}>
                    <Col xs={2} xsOffset={1}>
                        <FormControl type="text" placeholder="A3" name="attackCode" />
                    </Col>
                    <Col xs={2} md={3}>
                        <FormControl type="text" placeholder="R(2)C(2)U(5)" name="attackRcu" />
                    </Col>
                    <Col xs={2} md={3}>
                        <FormControl type="number" placeholder="9" name="aro" />
                    </Col>
                    <Col xs={2} md={3}>
                        <Button bsStyle="primary" onClick={this.handleAttackAdd}>Add</Button>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={4}><  h4><strong>Countermeasures</strong></h4></Col>
                </Row>
                {
                    this.props.countermeasures.map((countermeasure, i) =>
                        <Row key={i} className="show-grid">
                            <Col xs={5} xsOffset={4} style={{display: "flex"}}>
                                <Well style={{margin: 3, padding: 3, alignContent: "space-between"}}  bsSize="small">
                                <Label>{countermeasure.code}</Label> {countermeasure.rcu} <Button bsSize="small" onClick={() => this.handleCountermeasureDelete(i)}>Delete</Button>
                                </Well>
                            </Col>
                        </Row>
                    )
                }
                <Row className="show-grid" onChange={this.handleChange}>
                    <Col xs={2} xsOffset={1}>
                        <FormControl type="text" placeholder="C4" name="cmCode" />
                    </Col>
                    <Col xs={2} md={3}>
                        <FormControl type="text" placeholder="R(5)C(5)U(5)" name="cmRcu" />
                    </Col>
                    <Col xs={2} md={3}>
                        <FormControl type="number" placeholder="0.75" name="ef" />
                    </Col>
                    <Col xs={2} md={3}>
                        <Button bsStyle="primary" onClick={this.handleCountermeasureAdd}>Add</Button>
                    </Col>
                </Row>
            </Jumbotron>
        )
    }
}

const mapStateToProps = state => ({
    attacks: state.volumes.attacks,
    countermeasures: state.volumes.countermeasures
});

const mapDispatchToProps = dispatch => ({
    addAttackVolume: volume => dispatch(addAttack(volume)),
    addCountermeasureVolume: volume => dispatch(addCountermeasure(volume)),
    updateRoris: list => dispatch(updateRoris(list)),
    chartLoad: rori => dispatch(changeChart(rori)),
    updatePolyList: list => dispatch(updatePolies(list)),
    changePolyDisplay: poly => dispatch(changeDisplayPoly(poly)),
    deleteAttackVolume: id => dispatch(deleteAttack(id)),
    deleteCountermeasureVolume: id => dispatch(deleteCountermeasure(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Adder);