import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateRoris, changeChart } from '../../actions';
import Simulation from '../../simulation';

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
        const { attacks, countermeasures } = this.props;
        const { iv, aiv } = this.state;
        return (
            <div style={{ width: '25%' }}>
                <div>
                    <h4>System</h4>
                    <div>
                        <div>Infrastructure Value: {iv}</div>
                        <input name="iv" type="range" min="1000" max="10000" step="500" value={iv} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <div>AIV: {aiv}</div>
                        <input name="aiv" type="range" min="0" max="1000" step="50" value={aiv} onChange={this.changeHandler} />
                    </div>
                    <div><u>Resources</u></div>
                    <div>(1-2)[w:7] (3-4)[w:5] (5-6)[w:3]</div>
                    <div><u>Channels</u></div>
                    <div>(1)[w:9] (2-3)[w:5] (4-5)[w:2]</div>
                    <div><u>User Accounts</u></div>
                    <div>(1-2)[w:9] (3-4)[w:8] (5-6)[w:1]</div>
                </div>
                <div>
                    <h4>Attacks</h4>
                    {
                        attacks.map((attack, i) => <div key={i}>{`${attack.code}: ${attack.rcu}`}</div>)
                    }
                </div>
                <div>
                    <h4>Countermeasures</h4>
                    {
                        countermeasures.map((countermeasure, i) => <div key={i}>{`${countermeasure.code}: ${countermeasure.rcu}`}</div>)
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    attacks: state.volumes.attacks,
    countermeasures: state.volumes.countermeasures
});

const mapDispatchToProps = (dispatch) => ({
    updateRoris: (list) => dispatch(updateRoris(list)),
    chartLoad: (rori) => dispatch(changeChart(rori))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VolumeList);