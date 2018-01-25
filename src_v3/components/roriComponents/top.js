import React from 'react';

import Chart from './Chart';
import RoriList from './RoriList';

const Top = () => (
    <div style={containerStyle}>
        <Chart />
        <RoriList />
    </div>
);

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
};

const divStyle = { display: 'flex', width: '100%' };

export default Top;