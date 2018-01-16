import React from 'react';
import { connect } from 'react-redux';

import { changeDisplayPoly } from '../../actions';

const CMList = ({ list, changePoly }) => (
    <div>
        <ul>
            {list.map((element =>
                <div>
                    <li>{element.code}</li><button onClick={() => changePoly(element)}>Show</button>
                </div>
            ))}
        </ul>
    </div>
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