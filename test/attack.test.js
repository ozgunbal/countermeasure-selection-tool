import { assert, expect } from 'chai';

import System from '../models/system';
import Attack from '../models/attack';
import { volumeUnion, calculateVolume } from '../Engines/AVEngine';
import { generateVolumeObject } from '../Engines/message';
import { systemVolumeLarge } from './sampleTestData';

describe('Attack class', () => {
    const system = new System(4500, 700, systemVolumeLarge);
    const singleAttack = new Attack(['R(1-2)C(3)U(1-6)'], 12, system);
    const multipleAttack = new Attack(['R(1)C(3)U(1-3)', 'R(2)C(3)U(4-6)'], 12, system);
    describe('getVolumeObject', () => {
        it('should return object type', () => {
            assert.isObject(singleAttack.getVolumeObject());
        });
        it('should return correct volume object for single attack', () => {
            const expected = generateVolumeObject('R(1-2)C(3)U(1-6)', systemVolumeLarge);
            assert.deepEqual(singleAttack.getVolumeObject(), expected);
        });
        it('should return union of volume for multiple attacks', () => {
            const attackOne = generateVolumeObject('R(1)C(3)U(1-3)', systemVolumeLarge);
            const attackTwo = generateVolumeObject('R(2)C(3)U(4-6)', systemVolumeLarge);
            const unionAttack = volumeUnion([attackOne, attackTwo]);
            assert.deepEqual(multipleAttack.getVolumeObject(), unionAttack); 

        });
        it('should return same result when two cumulative attacks affect same volume as single attack', () => {
            assert.deepEqual(singleAttack.getVolumeObject(), multipleAttack.getVolumeObject());
        })
    });

    describe('getALE', () => {
        it('should return number', () => {
            assert.isNumber(singleAttack.getALE());
        });
        it('should return correct annual loss expectancy(ALE)', () => {
            const cf = system.getConversionFactor();
            const volume = calculateVolume(singleAttack.getVolumeObject());
            const attackALE = cf * volume * 12;
            assert.equal(singleAttack.getALE(), attackALE);
        });
    });
});