import { generateScatterVolume, generateVolumeObject } from '../Engines/message';
import { volumeUnionScatter, calculateVolumeWithScatter, volumeUnion } from '../Engines/AVEngine';
import { getDimensions } from '../Engines/nPolyEngine';

class Attack {
    constructor(attackStrings, annualRateOfOccurence, system) {
        const systemVolumeObject = system.getVolumeObject();

        if (attackStrings.length > 1) {
            const scatterVolumeObjects = attackStrings.map(attackString => generateScatterVolume(attackString, systemVolumeObject));
            this.scatterVolumeObject = volumeUnionScatter(scatterVolumeObjects);
            const volumeObjects = attackStrings.map(attackString => generateVolumeObject(attackString, systemVolumeObject));
            this.volumeObject = volumeUnion(volumeObjects);
        } else {
            this.scatterVolumeObject = generateScatterVolume(attackStrings[0], systemVolumeObject);
            this.volumeObject = generateVolumeObject(attackStrings[0], systemVolumeObject);
        }

        this.volume = calculateVolumeWithScatter(this.scatterVolumeObject);
        this.singleLossExpectancy = system.getConversionFactor() * this.volume;
        this.annualRateOfOccurence = annualRateOfOccurence;
    }
    // Annual Loss Expectancy
    getALE() {
        return this.singleLossExpectancy * this.annualRateOfOccurence;
    }
    getScatterVolumeObject() {
        return this.scatterVolumeObject;
    }
    getVolumeObject() {
        return this.volumeObject;
    }
    getDimensions(system) {
        return getDimensions(this.volumeObject, system.getVolumeObject());
    }
}

export default Attack;