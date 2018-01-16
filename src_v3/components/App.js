import React from 'react';
import PolygonModel from './svgComponents/top';
import Rori from './roriComponents/top';

const Root = () => (
    <div>
        <PolygonModel size ={200}/>
        <Rori/>
    </div>
);

//const {attack, cms} = poly.simulation();
//const dims = [attack, cms[3]]; //[[40, 50, 60, 40, 70], [70,20,80, 85, 34]];

export default Root;