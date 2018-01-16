import React from 'react';
import { connect } from 'react-redux';

import { changeDisplayPoly } from '../../actions';

const CMList = ({ list, changePoly }) => (
    <div style={{ width: '50%' }}>
        <ul style={{ width: '100%' }}>
            <li style={{ ...containerStyle, height: 20 }}>
                <div style={{ width: '15%' }}>S </div>
                <div style={{ width: '30%' }}>Perimeter: {list[0].systemP} units</div>
                <div style={{ width: '30%' }}>Area: {list[0].systemA} units^2</div>
                <div style={{ width: '20%' }}></div>
            </li>
            <li style={{ ...containerStyle, height: 20 }}>
                <div style={{ width: '15%' }}>A </div>
                <div style={{ width: '30%' }}>Perimeter: {list[0].attackP} units</div>
                <div style={{ width: '30%' }}>Area: {list[0].attackA} units^2</div>
                <div style={{ width: '20%' }}></div>
            </li>
            {list.map((element =>
                <li style={containerStyle}>
                    <div style={{ width: '15%' }}>{element.code}</div>
                    <div style={{ width: '30%' }}>Perimeter: {element.cmP} units</div>
                    <div style={{ width: '30%' }}>Area: {element.cmA} units^2</div>
                    <button style={{ width: '20%' }} onClick={() => changePoly(element)}>Show</button>
                </li>
            ))}
        </ul>
    </div>
);

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px solid black',
    borderRadius: '5px',
    fontSize: '80%',
    fontFamily: 'sans-serif',
    color: 'darkblue',
    margin: '10px auto'
};

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