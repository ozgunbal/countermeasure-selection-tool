import System from './models/system';
import Attack from './models/attack';
import Countermeasure from './models/countermeasure';
import { getCombinations, calculateRORIIndex } from './Engines/RORIEngine'

import countermeasureInfo from './DBs/counterMeasureDb';
import attackInfo from './DBs/attackDb';
import systemInfo from './DBs/systemDb'

import { systemVolumeLarge } from '../test/sampleTestData';

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
        rori: calculateRORIIndex(system, attack, cm.instance)
    }));
    console.log(roriList);
}

simulate(systemInfo, attackInfo, countermeasureInfo);