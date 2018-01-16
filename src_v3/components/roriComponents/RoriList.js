import React, { Component } from 'react';
import { connect } from 'react-redux';

import Rori from './Rori';

class RoriList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coverage: null,
            arc: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        const value = evt.target.name === 'coverage' ? Number(evt.target.value) / 100 : Number(evt.target.value);
        this.setState({ [evt.target.name]: value });
    }
    render() {
        const { coverage, arc } = this.state;
        const listData = this.props.listData.filter(rori => {
            if (coverage && arc) {
                return rori.coverage >= this.state.coverage && rori.arc <= this.state.arc
            } else if (coverage) {
                return rori.coverage >= coverage
            } else if (arc) {
                return rori.arc <= arc
            }
            return true;
        })
        return (
            <div style={{ width: '100%' }}>
                <div style={{width: '50%', margin: '10 auto'}} onChange={this.handleChange}>
                    <input style={{width: '50%', margin: '0 auto'}} type="text" name="coverage" placeholder="Minimum Coverage (0-100)"></input>
                    <input style={{width: '50%', margin: '0 auto'}} type="text" name="arc" placeholder="Maximum ARC ($)"></input>
                </ div>
                <div>
                    {listData.map((rori, index) => <Rori key={index} roriData={rori} />)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listData: state.roriList
})

export default connect(
    mapStateToProps
)(RoriList);