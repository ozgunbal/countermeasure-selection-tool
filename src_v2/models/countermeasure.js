import { generateScatterVolume } from '../Engines/message';
import { calculateScatterCoverage, volumeUnionScatter, calculateVolumeWithScatter } from '../Engines/AVEngine';

class Countermeasure {
    constructor(countermeasureStrings, EFs, ARCs, system){
        const systemVolumeObject = system.getVolumeObject();

        if (countermeasureStrings.length > 1) {
            const volumeObjects = countermeasureStrings.map(countermeasureString => generateScatterVolume(countermeasureString, systemVolumeObject));
            this.volumeObject = volumeUnionScatter(volumeObjects);
            /*const volumeObjects = countermeasureStrings.map(countermeasureString => generateVolumeObject(countermeasureString, systemVolumeObject));
            this.volumeObject = volumeIntersection(volumeObjects);*/
        } else {
            this.volumeObject = generateScatterVolume(countermeasureStrings[0], systemVolumeObject)
            // this.volumeObject = generateVolumeObject(countermeasureStrings[0], systemVolumeObject)
        }
        this.volume = calculateVolumeWithScatter(this.volumeObject);
        //this.volume = calculateVolume(this.volumeObject);
        this.effectivenessFactor = EFs.reduce((a,b) => a < b ? a : b); 
        this.annualResponseCost = ARCs.reduce((a,b) => a+b);
    }
    // Risk Mitigation
    getRM(attackVolumeObject) {
        return this.effectivenessFactor * this.getCoverage(attackVolumeObject);
    }
    getARC() {
        return this.annualResponseCost;
    }
    getVolumeObject() {
        return this.volumeObject;
    }
    getEF() {
        return this.effectivenessFactor;
    }
    getCoverage(attackVolumeObject) {
        return calculateScatterCoverage(attackVolumeObject, this.volumeObject) / 100;
        //return calculateCoverage(attackVolumeObject, this.volumeObject) / 100;
    }
}

export default Countermeasure;