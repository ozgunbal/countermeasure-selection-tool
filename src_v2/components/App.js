import React from 'react';

import Chart from './Chart';
import RoriList from './RoriList';
import Header from './Header';
import AttackAdder from './AttackAdder';
import CountermeasureAdder from './CountermeasureAdder';
import VolumeList from './VolumeList';


const App = () => (
    <div style ={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <div style={{ display: 'flex', width: '100%' }} >
            <Chart />
            <VolumeList />
        </div>
        <AttackAdder />
        <CountermeasureAdder />
        <RoriList />
        <Header />
    </div>
)

export default App;