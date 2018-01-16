import React from 'react';

import Chart from './Chart';
import RoriList from './RoriList';
import Header from './Header';
import AttackAdder from './AttackAdder';
import CountermeasureAdder from './CountermeasureAdder';
import VolumeList from './VolumeList';


const Top = () => (
    <div style={containerStyle}>
        <div style={divStyle} >
            <Chart />
            <VolumeList />
        </div>
        <AttackAdder />
        <CountermeasureAdder />
        <RoriList />
        <Header />
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