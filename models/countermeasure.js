import { generateVolumeObject } from '../Engines/message';
import { calculateCoverage, volumeIntersection } from '../Engines/AVEngine';

class Countermeasure {
    constructor(countermeasureStrings, EF, ARC, system){
        const systemVolumeObject = system.getVolumeObject();

        if (countermeasureStrings.length > 1) {
            const volumeObjects = countermeasureStrings.map(countermeasureString => generateVolumeObject(countermeasureString, systemVolumeObject));
            this.volumeObject = volumeIntersection(volumeObjects);
        } else {
            this.volumeObject = generateVolumeObject(countermeasureStrings[0], systemVolumeObject)
        }

        this.volumeObject = generateVolumeObject(countermeasureString, systemVolumeObject);
        this.volume = calculateVolume(this.volumeObject);
        this.effectivenessFactor = EF; 
        this.annualResponceCost = ARC;
    }
    // Risk Mitigation
    getRM(attackVolumeObject) {
        return this.effectivenessFactor * this.getCoverage(attackVolumeObject);
    }
    getARC() {
        return this.annualResponceCost;
    }
    getCoverage(attackVolumeObject) {
        return calculateCoverage(attackVolumeObject, this.volumeObject);
    }
}

export default Countermeasure;