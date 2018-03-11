import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Row, Col, FormControl } from 'react-bootstrap';
import RoriTable from './roriTable';

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
                return rori.coverage >= coverage;
            } else if (arc) {
                return rori.arc <= arc
            }
            return true;
        })
        return (
            <Jumbotron style={{ borderRadius: 10, padding: 0 }}>
                <Row className="show-grid" onChange={this.handleChange}>
                    <Col xs={4} xsOffset={1}>
                        <FormControl type="text" name="coverage" placeholder="Minimum Coverage (0-100)" />
                    </Col>
                    <Col xs={4} xsOffset={2}>
                        <FormControl type="text" name="arc" placeholder="Maximum ARC ($)" />
                    </Col>
                </ Row>
                <RoriTable roriList={listData} />
            </Jumbotron>
        );
    }
}

const mapStateToProps = (state) => ({
    listData: state.roriList
})

export default connect(
    mapStateToProps
)(RoriList);