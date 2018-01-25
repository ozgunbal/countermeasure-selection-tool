import React from 'react';
import { connect } from 'react-redux';

import { addCountermeasure, updateRoris, changeChart } from '../actions';
import Simulation from '../simulation';

class CountermeasureAdder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleCountermeasureAdd = this.handleCountermeasureAdd.bind(this);
        this.update = false;
    }
    handleCountermeasureAdd() {
        this.props.addCountermeasureVolume(this.state);
        this.update = true;
    }
    handleChange(evt) {
        if (evt.target.name === "ef") {
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
            <div style={{border: '1px solid black', margin: 10}}>
                <div><strong>Countermeasures</strong></div>
                {
                    this.props.countermeasures.map((countermeasure, i) => <div key={i}>{`${countermeasure.code}: ${countermeasure.rcu}`}</div>)
                }
                <div onChange={this.handleChange}>
                    <input type="text" name="code" placeholder="C4"></input>
                    <input type="text" name="rcu" placeholder="R(5)C(5)U(5)"></input>
                    <input type="text" name="ef" placeholder="0.75"></input>
                    <button onClick={this.handleCountermeasureAdd}>Add Countermeasure</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    attacks: state.volumes.attacks,
    countermeasures: state.volumes.countermeasures
});

const mapDispatchToProps = dispatch => ({
    addCountermeasureVolume: volume => dispatch(addCountermeasure(volume)),
    updateRoris: list => dispatch(updateRoris(list)),
    chartLoad: rori => dispatch(changeChart(rori))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CountermeasureAdder);