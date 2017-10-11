import { assert, expect } from 'chai';

import System from '../models/system';
import { calculateVolume } from '../Engines/AVEngine';
import { systemVolume } from './sampleTestData';

describe('System class', () => {
    const system = new System(4500, 700, systemVolume);
    describe('getVolume', () => {
        it('should return number', () => {
            assert.isNumber(system.getVolume());
        });
        it('should return correct volume', () => {
            assert.equal(system.getVolume(), 3520);
        });
    })

    describe('getConversionFactor', () => {
        it('should return number', () => {
            assert.isNumber(system.getConversionFactor());
        });
        it('should return correct conversion factor', () => {
            assert.equal(system.getConversionFactor(), (4500 / 3520));
        });
    })

    describe('getVolumeObject', () => {
        it('should return object type', () => {
            assert.isObject(system.getVolumeObject());
        });
        it('should be same as the given volumeObject', () => {
            assert.equal(system.getVolumeObject(), systemVolume);
        });
    });
    
    describe('getAIV', () => {
        it('should return number', () => {
            assert.isNumber(system.getAIV());
        });
        it('should be same as the given AIV', () => {
            assert.equal(system.getAIV(), 700);
        });
    });
});