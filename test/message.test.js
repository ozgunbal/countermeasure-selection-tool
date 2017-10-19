import { assert, expect } from 'chai';

import { isValid, getRangeArray, getRangeIndexArray, generateVolumeObject } from '../src/Engines/message';
import { systemVolume, systemVolumeLarge, volumeOne, volumeTwo } from './sampleTestData';



describe('Message Gathering', () => {
    describe('isValid', () => {
        it('should return true when is valid message is taken', () => {
            assert.isTrue(isValid('R(1)C(2,3)U(6-8)'));
        });
        it('should return false when missing element type in the message', () => {
            assert.isFalse(isValid('R(1)U(6-8)'));
        });
        it('should return false when string in the paranthesis ends with hyphen', () => {
            assert.isFalse(isValid('R(1-)C(2,3)U(6-8)'))
        });
        it('should return false when string in the paranthesis ends with comma', () => {
            assert.isFalse(isValid('R(1,)C(2,3)U(6-8)'))
        });
        it('should return false when non-numeric value in the paranthesis', () => {
            assert.isFalse(isValid('R(a-b)C(2,3)U(6-8)'))
        });
        it('should return true when both hyphen and comma is used in proper way', () => {
            assert.isTrue(isValid('R(1-2,4-6)C(3,5)U(1-6)'))
            assert.isTrue(isValid('R(1-2,5)C(3,5)U(1-6)'))
        });
    });
    describe('generateVolumeObject', () => {
        it('should return an object', () => {
            const volObj = generateVolumeObject('R(1-2)C(3)U(1-6)', systemVolume);
            assert.equal(typeof volObj, 'object');
        });
        it('should generate RCU properties for volume', () => {
            const volObj = generateVolumeObject('R(1-2)C(3)U(1-6)', systemVolume);
            assert.exists(volObj.resource);
            assert.exists(volObj.channel);
            assert.exists(volObj.userAccount);
        });
        it('should throw error when not all RCU elements are set', () => {
            assert.throws(() => generateVolumeObject('R(1-2)C(3)', systemVolume));
        })
        it('should handle the input when hyphen(-) between numbers', () => {
            const volObj = generateVolumeObject('R(1-2)C(3)U(1-6)', systemVolumeLarge);
            assert.equal(volObj.resource.length, 2);
            assert.equal(volObj.userAccount.length, 6);
        });
        it('should handle when comma between numbers', () => {
            const volObj = generateVolumeObject('R(1-2,4-6)C(3,5)U(1-6)', systemVolumeLarge);
            assert.equal(volObj.resource.length, 5);
            assert.equal(volObj.channel.length, 2);
        })
    })
})