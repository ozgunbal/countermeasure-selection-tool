import React from 'react';
import { connect } from 'react-redux';

import { addAttack, updateRoris, changeChart } from '../actions';
import Simulation from '../simulation';
import { Button, Jumbotron } from 'react-bootstrap';

class AttackAdder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleAttackAdd = this.handleAttackAdd.bind(this);
        this.update = false;
    }
    handleAttackAdd() {
        this.props.addAttackVolume(this.state);
        this.update = true;
    }
    handleChange(evt) {
        if (evt.target.name === "aro") {
            const value = Number(evt.target.value)
            this.setState({ [evt.target.name]: value });
        } else {
            this.setState({ [evt.target.name]: evt.target.value });
        }
    }
    componentDidUpdate() {
        if (this.update) {
            const list = Simulation.update(this.props.attacks, this.props.countermeasures);
            this.props.updateRoris(list);
            this.props.chartLoad(list[0]);
            this.update = false;
        }
    }
    render() {
        return (
            <Jumbotron style = {{margin:"2%", borderRadius: 10}}>
                <div><strong>Attacks</strong></div>
                {
                    this.props.attacks.map((attack, i) => <div key={i}>{`${attack.code}: ${attack.rcu}`}</div>)
                }
                <div onChange={this.handleChange}>
                    <input type="text" name="code" placeholder="A3"></input>
                    <input type="text" name="rcu" placeholder="R(2)C(2)U(5)"></input>
                    <input type="number" name="aro" placeholder="9"></input>
                    <Button bsStyle="primary" onClick={this.handleAttackAdd}>Add Attack</Button>
                </div>
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
    updateRoris: list => dispatch(updateRoris(list)),
    chartLoad: rori => dispatch(changeChart(rori))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AttackAdder);