import System from './models/system';
import Attack from './models/attack';
import Countermeasure from './models/countermeasure';
import { getCombinations } from './Engines/RORIEngine'

import countermeasureInfo from './DBs/counterMeasureDb';
import attackInfo from './DBs/attackDb';
import systemInfo from './DBs/systemDb'

import { getPerimeter, getArea } from './Engines/nPolyEngine';

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
    return CMInstances.map(cmi => {
        const cmDims = cmi.instance.getDimensions(system);
        const attackDims = attack.getDimensions(system);
        const systemDims = Array(cmDims.length).fill(100);
        return {
            code: cmi.code,
            attack: attackDims,
            attackP: getPerimeter(attackDims),
            attackA: getArea(attackDims),
            cm: cmDims,
            cmP: getPerimeter(cmDims),
            cmA: getArea(cmDims),
            systemP: getPerimeter(systemDims),
            systemA: getArea(systemDims),
            coverage: cmi.instance.getAreaCoverage(attack.getVolumeObject(), system),
            rr: 100 - cmi.instance.getAreaCoverage(attack.getVolumeObject(), system),
            pcd: cmi.instance.getAreaPotentialDamage(attack.getVolumeObject(), system),
        }
    });
};

const simulation = () => (
    simulate(systemInfo, attackInfo, countermeasureInfo)
)

const update = (newAttackInfo, newCountermeasureInfo) => (
    simulate(systemInfo, newAttackInfo, newCountermeasureInfo)
);

export default {
    simulation,
    update,
}