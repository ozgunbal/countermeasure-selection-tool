import React from 'react';

import Chart from './Chart';
import RoriList from './RoriList';
import Header from './Header';


const App = () => (
    <div>
        <Header />
        <Chart />
        <VolumeAdder />
        <RoriList />
    </div>
)

export default App;