import System from './models/system';
import Attack from './models/attack';
import Countermeasure from './models/countermeasure';
import { getCombinations, calculateRORIIndex } from './Engines/RORIEngine'

import countermeasureInfo from './DBs/counterMeasureDb';
import attackInfo from './DBs/attackDb';
import systemInfo from './DBs/systemDb'

import { systemVolumeLarge, volumeOne } from '../test/sampleTestData';

import { volumeSubstraction, volumeIntersection, calculateSingleAxis, generateRanges } from './Engines/AVEngine';
import { getRCUScatterPoints, getScatterPoints } from './Engines/message';
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
    const roriList = CMInstances.map(cm => {
        const onlyAttackVolume = volumeSubstraction([attack.getVolumeObject(), cm.instance.getVolumeObject()]);
        const onlyCMVolume = volumeSubstraction([cm.instance.getVolumeObject(), attack.getVolumeObject()]);
        const coverageVolume = volumeIntersection([attack.getVolumeObject(), cm.instance.getVolumeObject()]);
        console.log(getRCUScatterPoints(generateRanges(cm.instance.getVolumeObject())));
        return {
            code: cm.code,
            rori: calculateRORIIndex(system, attack, cm.instance),
            coverage: cm.instance.getCoverage(attack.getVolumeObject()),
            scatterRanges: {
                onlyAttack: getScatterPoints(attack.getVolumeObject()),
                onlyCM: getScatterPoints(generateRanges(cm.instance.getVolumeObject())),
                coverage: getScatterPoints(generateRanges(coverageVolume))
            }
        };
    });
    return roriList;
}

const RORIs = simulate(systemInfo, attackInfo, countermeasureInfo);
console.log(RORIs);

//chart parameters
const resourceLimit = systemInfo.volumeObject.resource.length;
const channelLimit = systemInfo.volumeObject.channel.length;
const userAccountLimit = systemInfo.volumeObject.userAccount.length;
console.log(resourceLimit);
console.log(channelLimit);
console.log(userAccountLimit);

let onlyAttack = RORIs[6].scatterRanges.onlyAttack;
let onlyCM = RORIs[6].scatterRanges.onlyCM;
let cover = RORIs[6].scatterRanges.coverage;

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
            text: `Attack Coverage of ${RORIs[6].code}` 
        },
        subtitle: {
            text: `Coverage: ${RORIs[6].coverage}`
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