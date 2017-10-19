import { generateVolumeObject } from '../Engines/message';
import { calculateCoverage, volumeIntersection, calculateVolume } from '../Engines/AVEngine';

class Countermeasure {
    constructor(countermeasureStrings, EFs, ARCs, system){
        const systemVolumeObject = system.getVolumeObject();

        if (countermeasureStrings.length > 1) {
            const volumeObjects = countermeasureStrings.map(countermeasureString => generateVolumeObject(countermeasureString, systemVolumeObject));
            this.volumeObject = volumeIntersection(volumeObjects);
        } else {
            this.volumeObject = generateVolumeObject(countermeasureStrings[0], systemVolumeObject)
        }

        this.volume = calculateVolume(this.volumeObject);
        this.effectivenessFactor = EFs.reduce((a,b) => a < b ? a : b); 
        this.annualResponseCost = ARCs.reduce((a,b) => a+b);
    }
    // Risk Mitigation
    getRM(attackVolumeObject) {
        return this.effectivenessFactor * calculateCoverage(attackVolumeObject, this.volumeObject) / 100;
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
}

export default Countermeasure;