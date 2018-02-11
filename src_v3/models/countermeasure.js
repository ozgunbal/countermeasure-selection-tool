import { generateScatterVolume, generateVolumeObject } from '../Engines/message';
import { calculateScatterCoverage, volumeUnionScatter, calculateVolumeWithScatter, volumeUnion } from '../Engines/AVEngine';
import { getDimensions } from '../Engines/nPolyEngine';

class Countermeasure {
    constructor(countermeasureStrings, EFs, system){
        const systemVolumeObject = system.getVolumeObject();

        if (countermeasureStrings.length > 1) {
            const scatterVolumeObjects = countermeasureStrings.map(countermeasureString => generateScatterVolume(countermeasureString, systemVolumeObject));
            this.scatterVolumeObject = volumeUnionScatter(scatterVolumeObjects);
            const volumeObjects = countermeasureStrings.map(countermeasureString => generateVolumeObject(countermeasureString, systemVolumeObject));
            this.volumeObject = volumeUnion(volumeObjects);
        } else {
            this.scatterVolumeObject = generateScatterVolume(countermeasureStrings[0], systemVolumeObject);
            this.volumeObject = generateVolumeObject(countermeasureStrings[0], systemVolumeObject);
        }
        this.volume = calculateVolumeWithScatter(this.scatterVolumeObject);
        this.effectivenessFactor = EFs.reduce((a,b) => a < b ? a : b); 
        this.annualResponseCost = this.volume * system.getConversionFactor() //+ 10;
    }
    // Risk Mitigation
    getRM(attackVolumeObject) {
        return this.effectivenessFactor * this.getCoverage(attackVolumeObject);
    }
    getARC() {
        return this.annualResponseCost;
    }
    getScatterVolumeObject() {
        return this.scatterVolumeObject;
    }
    getEF() {
        return this.effectivenessFactor;
    }
    getCoverage(attackVolumeObject) {
        return calculateScatterCoverage(attackVolumeObject, this.scatterVolumeObject) / 100;
    }
    getDimensions(system) {
        return getDimensions(this.volumeObject, system.getVolumeObject());
    }
}

export default Countermeasure;