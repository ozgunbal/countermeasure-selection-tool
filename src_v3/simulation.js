import System from './models/system';
import Attack from './models/attack';
import Countermeasure from './models/countermeasure';
import { getCombinations, calculateRORIIndex } from './Engines/RORIEngine'

import countermeasureInfo from './DBs/counterMeasureDb';
import attackInfo from './DBs/attackDb';
import systemInfo from './DBs/systemDb'

import { systemVolumeLarge, volumeOne } from '../test/sampleTestData';

import { volumeSubtractionScatter, volumeIntersectionScatter, calculateSingleAxis, generateRanges } from './Engines/AVEngine';
import { getRCUScatterPoints, getScatterPoints, getRCUScatterPointsWithVolume } from './Engines/message';


const simulate = (systemInfo, attackInfo, countermeasureInfo) => {
    const system = new System(systemInfo.infrastructureValue, systemInfo.aiv, systemInfo.volumeObject);
    const attack = new Attack(attackInfo.map(attack => attack.rcu), attackInfo[0].aro, system);

    const CMs = getCombinations(countermeasureInfo);
    const CMInstances = CMs.map(comb => {
        const code = comb.map(cm => cm.code);
        const string = comb.map(cm => cm.rcu);
        const efs = comb.map(cm => cm.ef);

        return {
            code: code.sort().join('-'),
            instance: new Countermeasure(string, efs, system)
        }
    });
    const roriList = CMInstances.map(cm => {
        const onlyAttackVolume = volumeSubtractionScatter([attack.getScatterVolumeObject(), cm.instance.getScatterVolumeObject()]);
        const onlyCMVolume = volumeSubtractionScatter([cm.instance.getScatterVolumeObject(), attack.getScatterVolumeObject()]);
        const coverageVolume = volumeIntersectionScatter([attack.getScatterVolumeObject(), cm.instance.getScatterVolumeObject()]);
        return {
            code: cm.code,
            rori: calculateRORIIndex(system, attack, cm.instance),
            coverage: cm.instance.getCoverage(attack.getScatterVolumeObject()),
            arc: cm.instance.getARC(),
            scatterRanges: {
                onlyAttack: getScatterPoints(onlyAttackVolume),
                onlyCM: getScatterPoints(onlyCMVolume),
                coverage: getScatterPoints(coverageVolume)
            }
        };
    });
    return roriList;
}

const simulation = () => (
    simulate(systemInfo, attackInfo, countermeasureInfo)
)

const update = (newAttackInfo, newCountermeasureInfo) => (
    simulate(systemInfo, newAttackInfo, newCountermeasureInfo)
)

const infraUpdate = (infrastructureValue, aiv) => (
    simulate({
        ...systemInfo,
        infrastructureValue,
        aiv
    }, attackInfo, countermeasureInfo)
);

const chartLimits = {
    resource: systemInfo.volumeObject.resource.length,
    channel: systemInfo.volumeObject.channel.length,
    userAccount: systemInfo.volumeObject.userAccount.length,
}

export default {
    simulation,
    chartLimits,
    update,
    infraUpdate,
}