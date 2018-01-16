import System from './models/system';
import Attack from './models/attack';
import Countermeasure from './models/countermeasure';
import { getCombinations } from './Engines/RORIEngine'

import countermeasureInfo from './DBs/counterMeasureDb';
import attackInfo from './DBs/attackDb';
import systemInfo from './DBs/systemDb'

import {  } from './Engines/nPolyEngine';
import {  } from './Engines/message';


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
    return {
        attack: attack.getDimensions(system),
        cms: CMInstances.map(cm => cm.instance.getDimensions(system))
    };
}

const simulation = () => (
    simulate(systemInfo, attackInfo, countermeasureInfo)
)

export default {
    simulation,
}