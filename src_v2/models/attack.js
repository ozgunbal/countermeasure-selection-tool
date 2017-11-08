import { generateScatterVolume } from '../Engines/message';
import { volumeUnionScatter, calculateVolumeWithScatter } from '../Engines/AVEngine';

class Attack {
    constructor(attackStrings, annualRateOfOccurence, system) {
        const systemVolumeObject = system.getVolumeObject();

        if (attackStrings.length > 1) {
            const volumeObjects = attackStrings.map(attackString => generateScatterVolume(attackString, systemVolumeObject));
            this.volumeObject = volumeUnionScatter(volumeObjects);
            /*const volumeObjects = attackStrings.map(attackString => generateVolumeObject(attackString, systemVolumeObject));
            this.volumeObject = volumeUnion(volumeObjects);*/
        } else {
            this.volumeObject = generateScatterVolume(attackStrings[0], systemVolumeObject);
        }

        //this.volume = calculateVolume(this.volumeObject);
        this.volume = calculateVolumeWithScatter(this.volumeObject)
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