import React from 'react';
import { connect } from 'react-redux';

const VolumeList = ({attacks, countermeasures}) => {
    return(
        <div style={{width: '25%'}}>
            <div>
                <h4>System</h4>
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
};

const mapStateToProps = (state) => {
    return {
        attacks: state.volumes.attacks,
        countermeasures: state.volumes.countermeasures
    }
}

export default connect(
    mapStateToProps
)(VolumeList);