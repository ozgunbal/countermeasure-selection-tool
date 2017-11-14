import React from 'react';
import { connect } from 'react-redux';

const VolumeList = ({attacks, countermeasures}) => {
    return(
        <div style={{width: '20%'}}>
            <div>
                <h4>Attacks</h4>
                {
                    attacks.map(attack => <div>{`${attack.code}: ${attack.rcu}`}</div>)
                }
            </div>
            <div>
                <h4>Countermeasures</h4>
                {
                    countermeasures.map(countermeasure => <div>{`${countermeasure.code}: ${countermeasure.rcu}`}</div>)
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