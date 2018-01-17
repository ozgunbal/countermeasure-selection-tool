import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PolygonModel from './svgComponents/top';
import VolumeModule from './roriComponents/top';
import Header from './header';

const Root = () => (
    <div>
        <Header/>
        <Switch>
            <Route path='/volume' component={VolumeModule}/>
            <Route path='/polygon' component={PolygonModel}/>
        </Switch>
    </div>
);

//const {attack, cms} = poly.simulation();
//const dims = [attack, cms[3]]; //[[40, 50, 60, 40, 70], [70,20,80, 85, 34]];

export default Root;