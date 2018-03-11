import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { changeDisplayPoly } from '../../actions';

const CMList = ({ list, changePoly }) => (
    <Table striped bordered condensed responsive style={{marginTop: '5%'}}>
        <thead>
            <tr>
                <th>#</th>
                <th>Perimeter</th>
                <th>Area</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>System</td>
                <td>{list[0].systemP} units</td>
                <td>{list[0].systemA} units^2</td>
                <td></td>
            </tr>
            <tr>
                <td>Attack</td>
                <td>{list[0].attackP} units</td>
                <td>{list[0].attackA} units^2</td>
                <td></td>
            </tr>
            {
                list.map(element => (
                    <tr>
                        <td>{element.code}</td>
                        <td>{element.cmP} units</td>
                        <td>{element.cmA} units^2</td>
                        <td><Button onClick={() => changePoly(element)}>Show</Button></td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
);

const mapStateToProps = (state) => ({
    list: state.polygonAreas,
});

const mapDispatchToProps = dispatch => ({
    changePoly: (element) => dispatch(changeDisplayPoly(element)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CMList);