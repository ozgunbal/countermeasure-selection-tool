import React from 'react';
import { connect } from 'react-redux';

import Rori from './Rori';

const RoriList = ({ listData }) => (
    <div>
        <span>Results</span>
        {listData.map((rori, index) => <Rori key={index} roriData={rori} />)}
    </div>
)

const mapStateToProps = (state) => ({
    listData: state.roriList
})

export default connect(
    mapStateToProps
)(RoriList);