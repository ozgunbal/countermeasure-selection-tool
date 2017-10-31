import System from './models/system';
import Attack from './models/attack';
import Countermeasure from './models/countermeasure';
import { getCombinations, calculateRORIIndex } from './Engines/RORIEngine'

import countermeasureInfo from './DBs/counterMeasureDb';
import attackInfo from './DBs/attackDb';
import systemInfo from './DBs/systemDb'

import { systemVolumeLarge, volumeOne } from '../test/sampleTestData';

import { calculateSingleAxis, generateRanges } from './Engines/AVEngine';
import { getScatterPoints } from './Engines/message';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsMore from 'highcharts-more';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsExporting(Highcharts);
HighchartsMore(Highcharts);
Highcharts3D(Highcharts);

// First define all system in index.js
// then lookup for database

const simulate = (systemInfo, attackInfo, countermeasureInfo) => {
    const system = new System(systemInfo.infrastructureValue, systemInfo.aiv, systemInfo.volumeObject);
    const attack = new Attack(attackInfo.map(attack => attack.rcu), attackInfo[0].aro, system);

    const CMs = getCombinations(countermeasureInfo);
    const CMInstances = CMs.map(comb => {
        const code = comb.map(cm => cm.code);
        const string = comb.map(cm => cm.rcu);
        const efs = comb.map(cm => cm.ef);
        const arcs = comb.map(cm => cm.arc);

        return {
            code: code.sort().join('-'),
            instance: new Countermeasure(string, efs, arcs, system)
        }
    });
    const roriList = CMInstances.map(cm => ({
        code: cm.code,
        rori: calculateRORIIndex(system, attack, cm.instance),
        scatterRanges: getScatterPoints(generateRanges(cm.instance.getVolumeObject(), systemInfo.volumeObject))
    }));
    console.log(roriList);
}

simulate(systemInfo, attackInfo, countermeasureInfo);

//chart parameters
const resourceLimit = systemVolumeLarge.resource.length;
const channelLimit = systemVolumeLarge.channel.length;
const userAccountLimit = systemVolumeLarge.userAccount.length;
console.log(resourceLimit);
console.log(channelLimit);
console.log(userAccountLimit);

/*let onlyAttack = getScatterPoints(generateRanges(, systemVolumeLarge));
let onlyCM = getScatterPoints(generateRanges(, systemVolumeLarge));
let cover = getScatterPoints(generateRanges(, systemVolumeLarge));*/

document.addEventListener("DOMContentLoaded", function () {
    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            margin: 100,
            type: 'scatter3d',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 20,
                depth: 250,
                viewDistance: 3,
                fitToPlot: false,
                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
        },
        title: {
            text: 'Attack Coverage'
        },
        plotOptions: {
            scatter: {
                width: 10,
                height: 10,
                depth: 10
            }
        },
        xAxis: {
            min: 1,
            max: resourceLimit,
            title: 'Resource'
        },
        yAxis: {
            min: 1,
            max: channelLimit,
            title: 'Channel'
        },
        zAxis: {
            min: 1,
            max: userAccountLimit,
            title: 'User Account'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Attack',
            color: 'red',
            data: onlyAttack
        },
        {
            name: 'Countermeasure',
            color: 'blue',
            data: onlyCM
        },
        {
            name: 'Coverage',
            color: 'purple',
            data: cover
        }]
    });
});

const mapVolumeToScatterPoints = (volumeOne) => {

} 