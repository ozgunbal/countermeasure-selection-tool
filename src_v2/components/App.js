import React from 'react';

import Chart from './Chart';
import RoriList from './RoriList';
import Header from './Header';
import AttackAdder from './AttackAdder';
import CountermeasureAdder from './CountermeasureAdder';
import VolumeList from './VolumeList';


const App = () => (
    <div>
        <Header />
        <div style={{display: 'flex'}} >
            <VolumeList />
            <Chart />
        </div>
        <AttackAdder />
        <CountermeasureAdder />
        <RoriList />
    </div>
)

export default App;