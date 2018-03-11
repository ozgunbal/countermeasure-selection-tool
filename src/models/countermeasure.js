import { generateScatterVolume, generateVolumeObject, getVolumeDrawParameters } from '../Engines/message';
import { calculateScatterCoverage, volumeUnionScatter, calculateVolumeWithScatter, volumeUnion, calculateCoverageVolume } from '../Engines/AVEngine';
import { getDimensions, calculateAreaCoverage, getArea, calculateCoverageArea } from '../Engines/nPolyEngine';

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

        this.drawParameters = countermeasureStrings.map(attack => getVolumeDrawParameters(attack, systemVolumeObject));
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
    getCoverage(attackScatterVolumeObject) {
        return calculateScatterCoverage(attackScatterVolumeObject, this.scatterVolumeObject);
    }
    getAreaCoverage(attackVolumeObject, system) {
        return calculateAreaCoverage(attackVolumeObject, this.volumeObject, system.getVolumeObject());
    }
    getDimensions(system) {
        return getDimensions(this.volumeObject, system.getVolumeObject());
    }
    getDrawParameters() {
        return this.drawParameters;
    }
    getPotentialDamage(attackScatterVolumeObject) {
        const coverageVolume = calculateCoverageVolume(attackScatterVolumeObject, this.scatterVolumeObject);
        return (this.volume - coverageVolume ) * 100 / this.volume;
    }
    getAreaPotentialDamage(attackVolumeObject, system) {
        const cmArea = getArea(this.getDimensions(system));
        const coverageArea = calculateCoverageArea(attackVolumeObject, this.volumeObject, system.getVolumeObject())
        return (cmArea - coverageArea ) * 100 / cmArea;
    }
}

export default Countermeasure;