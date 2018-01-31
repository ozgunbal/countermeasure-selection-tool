import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { changeChart } from '../../actions';

const RoriTable = ({ roriList, chartLoad }) => (
    <Table striped bordered condensed responsive>
        <thead>
            <tr>
                <th>Countermeasure Code</th>
                <th>RORI Index</th>
                <th>Coverage %</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                roriList.map((roriData, idx) => (
                    <tr key={idx}>
                        <td>{roriData.code}</td>
                        <td>{(roriData.rori).toFixed(3)}</td>
                        <td>{(roriData.coverage * 100).toFixed(2)}%</td>
                        <td><Button onClick={() => chartLoad(roriData)}>Show</Button></td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
);

const mapDispatchToProps = (dispatch) => ({
    chartLoad: (rori) => dispatch(changeChart(rori))
})

export default connect(
    null,
    mapDispatchToProps
)(RoriTable);