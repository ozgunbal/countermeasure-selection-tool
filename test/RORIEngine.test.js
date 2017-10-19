import { assert } from 'chai';

import Attack from '../src/models/attack';
import Countermeasure from '../src/models/countermeasure';
import System from '../src/models/system';
import { calculateRORIIndex } from '../src/Engines/RORIEngine.js'
import { systemVolumeLarge } from './sampleTestData';

describe('RORI Engine', () => {
    describe('calculateRORIIndex', () => {
        const system = new System(4500, 700, systemVolumeLarge);
        const singleAttack = new Attack(['R(1-2)C(3)U(1-6)'], 12, system);
        const multipleAttack = new Attack(['R(1)C(3)U(1-3)', 'R(2)C(3)U(4-6)'], 12, system);
        const singleCountermeasure = new Countermeasure(['R(1)C(3)U(1-3)'], [0.8], [400], system);
        const multipleCountermeasure = new Countermeasure(['R(1)C(3)U(1-3)', 'R(1)C(3)U(1-5)'], [0.8, 0.7], [400, 500], system);
        it('should return number', () => {
            const rori = calculateRORIIndex(system, singleAttack, singleCountermeasure);
            assert.isNumber(rori);
        });
        it('should return correct result with one attack and one countermeasure', () => {
            const ale = singleAttack.getALE();
            const aiv = system.getAIV();
            const arc = singleCountermeasure.getARC();
            const rm = singleCountermeasure.getRM(singleAttack.getVolumeObject());
            const expected = ((ale * rm) - arc) / (arc + aiv);

            const rori = calculateRORIIndex(system, singleAttack, singleCountermeasure);
            assert.equal(rori, expected);

        });
        it('should return correct result with multiple attack and one countermeasure', () => {
            const ale = multipleAttack.getALE();
            const aiv = system.getAIV();
            const arc = singleCountermeasure.getARC();
            const rm = singleCountermeasure.getRM(multipleAttack.getVolumeObject());
            const expected = ((ale * rm) - arc) / (arc + aiv);

            const rori = calculateRORIIndex(system, multipleAttack, singleCountermeasure);
            assert.equal(rori, expected);
        });
        it('should return correct result with one attack and multiple countermeasure', () => {
            const ale = singleAttack.getALE();
            const aiv = system.getAIV();
            const arc = multipleCountermeasure.getARC();
            const rm = multipleCountermeasure.getRM(singleAttack.getVolumeObject());
            const expected = ((ale * rm) - arc) / (arc + aiv);

            const rori = calculateRORIIndex(system, singleAttack, multipleCountermeasure);
            assert.equal(rori, expected);
        });
        it('should return correct result with multiple attack and multiple countermeasure', () => {
            const ale = multipleAttack.getALE();
            const aiv = system.getAIV();
            const arc = multipleCountermeasure.getARC();
            const rm = multipleCountermeasure.getRM(multipleAttack.getVolumeObject());
            const expected = ((ale * rm) - arc) / (arc + aiv);

            const rori = calculateRORIIndex(system, multipleAttack, multipleCountermeasure);
            assert.equal(rori, expected);
        });
    });
})