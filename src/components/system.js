import React from 'react';
import Adder from './adder';
import VolumeList from './VolumeList';
import { Grid } from 'react-bootstrap';

const System = () => (
    <Grid>
        <VolumeList />
        <Adder/>
    </Grid>
);

export default System;