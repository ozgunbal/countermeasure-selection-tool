import { generateVolumeObject } from '../Engines/message';
import { volumeIntersection, calculateVolume } from '../Engines/AVEngine';

// TODO: join two class in to one!!

class Countermeasure {
    constructor(countermeasureString, EF, ARC, System){
        this.effectivenessFactor = EF; 
        this.annualResponceCost = ARC;
        this.volumeObject = generateVolumeObject(countermeasureString, System.getVolumeObject());
        this.volume = calculateVolume(this.volumeObject);
    }
    // Risk Mitigation
    getRM(attackVolumeObject) {
        return this.effectivenessFactor * this.getCoverage(attackVolumeObject);
    }
    getARC() {
        return this.annualResponceCost;
    }
    getCoverage(attackVolumeObject) {
        const attackCMintersection = volumeIntersection([attackVolumeObject, this.volumeObject]);
        const attackVolume = calculateVolume(attackVolumeObject);

        return attackCMintersection / attackVolume;
    }
}

class MultipleCounterMeasure {
    constructor()

}

export default Countermeasure;