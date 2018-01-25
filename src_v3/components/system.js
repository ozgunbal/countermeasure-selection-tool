import React from 'react';
import AttackAdder from './AttackAdder';
import CountermeasureAdder from './CountermeasureAdder';
import VolumeList from './VolumeList';

const System = () => (
    <div>
        <VolumeList />
        <AttackAdder />
        <CountermeasureAdder />
    </div>
);

export default System;