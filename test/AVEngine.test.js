import { assert, expect } from 'chai';

import {
    volumeIntersection,
    volumeUnion,
    calculateVolume,
    calculateSingleAxis,
    intersectSingleAxis,
    unionSingleAxis,
    calculateCoverage
} from '../src/Engines/AVEngine';

import { systemVolume, volumeOne, volumeTwo } from './sampleTestData';

describe('Attack Volume Engine', () => {

    describe('calculateSingleAxis', () => {
        it('should return number', () => {
            const length = calculateSingleAxis(systemVolume.channel);
            assert.isNumber(length);
        });
        it('should calculate correctly', () => {
            const length = calculateSingleAxis(systemVolume.channel);
            assert.equal(length, 16);
        })
    })

    describe('intersectSingleAxis', () => {
        it('should be empty array if no intersection', () => {
            const axis = intersectSingleAxis([volumeOne.resource, volumeTwo.resource]);
            assert.isArray(axis);
            assert.equal(axis.length, 0);
        });
        it('should return true intersection of two volumes', () => {
            const axis = intersectSingleAxis([systemVolume.resource, volumeOne.resource]);
            assert.deepEqual(axis, 
                [{
                    rangeIndex: 1,
                    weight: 4,
                    description: 'server'
                }]);
        });
        it('should return true intersection of more than two volumes', () => {
            const axis = intersectSingleAxis([systemVolume.resource, volumeOne.resource, volumeTwo.resource]);
            assert.equal(axis.length, 0);
        });
        it('should return itself for an intersection with itself', () => {
            const axis = intersectSingleAxis([volumeOne.resource, volumeOne.resource]);
            assert.deepEqual(axis, volumeOne.resource);
        });
    })

    describe('unionSingleAxis', () => {
        it('should return an array', () => {
            const unionAxis = unionSingleAxis([volumeOne.resource, volumeTwo.resource]);
            assert.isArray(unionAxis);
        });
        it('should return sum of axes when union of disjoint volumes are calculated', () => {
            const axisOne = calculateSingleAxis(volumeOne.resource);
            const axisTwo = calculateSingleAxis(volumeTwo.resource);

            const unionAxis = unionSingleAxis([volumeOne.resource, volumeTwo.resource]);
            const unionVal = calculateSingleAxis(unionAxis);

            const intersectAxis = intersectSingleAxis([volumeOne.resource, volumeTwo.resource]);
            const intersectVal = calculateSingleAxis(intersectAxis);

            assert.equal(intersectVal, 0);
            assert.equal(unionVal, axisOne + axisTwo);
        })
        it('should return true union of two volumes', () => {
            const axis = unionSingleAxis([volumeOne.resource, volumeTwo.resource]);
            assert.deepEqual(axis, systemVolume.resource);
        });
        it('should return true union of more than two volumes', () => {
            const axis = unionSingleAxis([systemVolume.resource, volumeOne.resource, volumeTwo.resource]);
            assert.deepEqual(axis, systemVolume.resource);
        });
        it('should return itself for an union with itself', () => {
            const axis = unionSingleAxis([volumeOne.resource, volumeOne.resource]);
            assert.deepEqual(axis, volumeOne.resource);
        });
    })

    describe('calculateVolume', () => {
        it('should return number', () => {
            const volume = calculateVolume(systemVolume);
            assert.isNumber(volume);
        })
        it('should throw error for invalid volume object input', () => {
            expect(() => calculateVolume({})).to.throw();
        })
        it('should calculate correctly', () => {
            const volume = calculateVolume(systemVolume);
            assert.equal(volume, 3520);
        })
    });

    describe('volumeIntersection', () => {
        it('should be zero if no intersection', () => {
            const intersect = volumeIntersection([volumeOne, volumeTwo]);
            const volume = calculateVolume(intersect);
            assert.equal(volume, 0);
        })
        it('should calculate intersection of system and subVolume as a subVolume', () => {
            const intersect = volumeIntersection([systemVolume, volumeOne]);
            const singleVolume = calculateVolume(volumeOne);
            const intersectVolume = calculateVolume(intersect);
            assert.equal(intersectVolume, singleVolume);
        })
        it('should calculate intersection of more than two volumes', () => {
            const volume = volumeIntersection([systemVolume, volumeOne, volumeTwo]);
            assert.deepEqual(volume, {
                resource: [],
                channel: [],
                userAccount: []
            });
        })
    })

    describe('volumeUnion', () => {
        it('should union of disjoint volumes greater than their sum', () => {
            const vol1 = calculateVolume(volumeOne);
            const vol2 = calculateVolume(volumeTwo);
            const union = volumeUnion([volumeOne, volumeTwo]);
            const unionVol = calculateVolume(union);
            expect(unionVol).to.greaterThan(vol1 + vol2)
        })

        it('should calculate union of more than two volumes', () => {
            const volume = volumeUnion([systemVolume, volumeOne, volumeTwo]);
            assert.deepEqual(volume, systemVolume);
        })
    });
    describe('calculateCoverage', () => {
        it('should return a number', () => {
            const percentage = calculateCoverage(volumeOne, volumeTwo);
            assert.isNumber(percentage);
        });
        it('should return 0 percentage when attack surface is not covered', () => {
            const percentage = calculateCoverage(volumeOne, volumeTwo);
            assert.equal(percentage, 0);
        });
        it('should return 100 percentage when attack surface is fully covered', () => {
            const percentage = calculateCoverage(volumeOne, volumeOne);
            assert.equal(percentage, 100);
        });
    })
})