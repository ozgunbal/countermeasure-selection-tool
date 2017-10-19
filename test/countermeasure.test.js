import { assert, expect } from 'chai';

import System from '../src/models/system';
import Countermeasure from '../src/models/countermeasure';
import Attack from '../src/models/attack';
import { volumeIntersection, calculateVolume, calculateCoverage } from '../src/Engines/AVEngine';
import { generateVolumeObject } from '../src/Engines/message';
import { systemVolumeLarge } from './sampleTestData';

describe('Countermeasure class', () => {
    const system = new System(4500, 700, systemVolumeLarge);
    const attack = new Attack(['R(1-2)C(3)U(1-6)'], 12, system);
    const singleCountermeasure = new Countermeasure(['R(1)C(3)U(1-3)'], [0.8], [400], system);
    const multipleCountermeasure = new Countermeasure(['R(1)C(3)U(1-3)', 'R(1)C(3)U(1-5)'], [0.8, 0.7], [400, 500], system);
    describe('getARC', () => {
        it('should return number', () => {
            assert.isNumber(singleCountermeasure.getARC());
        });
        it('should return correct annual response cost when single CM exists', () => {
            assert.equal(singleCountermeasure.getARC(), 400);
        });
        it('should return correct annual response cost when multiple CM exist', () => {
            assert.equal(multipleCountermeasure.getARC(), 900);
        });
    })

    describe('getEF', () => {
        it('should return number', () => {
            assert.isNumber(singleCountermeasure.getEF());
        });
        it('should return correct effectiveness factor when single CM exists', () => {
            assert.equal(singleCountermeasure.getEF(), 0.8);
        });
        it('should return correct effectiveness factor when multiple CM exist', () => {
            assert.equal(multipleCountermeasure.getEF(), 0.7);
        });
    });

    describe('getVolumeObject', () => {
        it('should return object type', () => {
            assert.isObject(singleCountermeasure.getVolumeObject());
        });
        it('should return correct volume object for single countermeasure', () => {
            const expected = generateVolumeObject('R(1)C(3)U(1-3)', systemVolumeLarge);
            assert.deepEqual(singleCountermeasure.getVolumeObject(), expected);
        });
        it('should return intersection of volume for multiple countermeasures', () => {
            const countermeasureOne = generateVolumeObject('R(1)C(3)U(1-3)', systemVolumeLarge);
            const countermeasureTwo = generateVolumeObject('R(1)C(3)U(1-5)', systemVolumeLarge);
            const intersectionCountermeasure = volumeIntersection([countermeasureOne, countermeasureTwo]);
            assert.deepEqual(multipleCountermeasure.getVolumeObject(), intersectionCountermeasure); 

        });
        it('should return smaller one when one countermeasure includes other one', () => {
            assert.deepEqual(multipleCountermeasure.getVolumeObject(), singleCountermeasure.getVolumeObject());
        })
    });

    describe('getRM', () => {
        it('should return number', () => {
            const attackVolumeObject = attack.getVolumeObject();
            assert.isNumber(singleCountermeasure.getRM(attackVolumeObject));
        });
        it('should between 0 and 1', () => {
            const attackVolumeObject = attack.getVolumeObject();
            assert.isAtLeast(singleCountermeasure.getRM(attackVolumeObject), 0);
            assert.isAtMost(singleCountermeasure.getRM(attackVolumeObject), 1);
        });
        it('should return correct risk mitigation for single countermeasure', () => {
            const attackVolumeObject = attack.getVolumeObject();
            const percentCoverage = calculateCoverage(attackVolumeObject, singleCountermeasure.getVolumeObject());
            const rm = 0.8 * percentCoverage / 100;
            assert.equal(singleCountermeasure.getRM(attackVolumeObject), rm);
        });
        it('should return correct risk mitigation for multiple countermeasures', () => {
            const attackVolumeObject = attack.getVolumeObject();
            const percentCoverage = calculateCoverage(attackVolumeObject, multipleCountermeasure.getVolumeObject());
            const rm = 0.7 * percentCoverage / 100;
            assert.equal(multipleCountermeasure.getRM(attackVolumeObject), rm);
        });
    })
});