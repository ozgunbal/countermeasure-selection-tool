import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PolygonModel from './svgComponents/top';
import VolumeModule from './roriComponents/top';
import System from './system';
import Home from './home';
import Header from './header';

const Root = () => (
    <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/system' component={System}/>
            <Route path='/volume' component={VolumeModule}/>
            <Route path='/polygon' component={PolygonModel}/>
        </Switch>
    </div>
);

export default Root;