import { generateVolumeObject } from '../Engines/message';
import { volumeUnion, calculateVolume } from '../Engines/AVEngine';

class Attack {
    constructor(attackStrings, annualRateOfOccurence, system) {
        const systemVolumeObject = system.getVolumeObject();

        if (attackStrings.length > 1) {
            const volumeObjects = attackStrings.map(attackString => generateVolumeObject(attackString, systemVolumeObject));
            this.volumeObject = volumeUnion(volumeObjects);
        } else {
            this.volumeObject = generateVolumeObject(attackStrings[0], systemVolumeObject)
        }

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

export default Attack;