import { generateVolumeObject } from '../Engines/message';
import { volumeUnion, calculateVolume } from '../Engines/AVEngine';

// TODO: join two class in to one!!

// Single Attack
class Attack {
    constructor(attackString, annualRateOfOccurence, system) {
        this.volumeObject = generateVolumeObject(attackString, system.getVolumeObject());
        this.volume = calculateVolume(this.volumeObject);
        this.singleLossExpectancy = system.getConversionFactor() * this.volume;
        this.annualRateOfOccurence = annualRateOfOccurence;
    }
    // Annual Loss Expectancy
    getALE() {
        return this.singleLossExpectancy * this.annualRateOfOccurence;
    }
    getVolumeObject() {
        return this.volumeObject;
    }
}

// Multiple Attack
class MultiAttack {
    constructor(attackStrings, annualRateOfOccurence, System) {
        const systemVolumeObject = System.getVolumeObject();
        this.volumeObjects = attackStrings.map(attackString => generateVolumeObject(attackString, systemVolumeObject));
        this.volume = calculateVolume(volumeUnion(this.volumeObjects));
        this.singleLossExpectancy = System.getConversionFactor() * this.volume;
        this.annualRateOfOccurence = annualRateOfOccurence;
    }
    getALE() {
        return this.singleLossExpectancy * this.annualRateOfOccurence;
    }
}

export default Attack;