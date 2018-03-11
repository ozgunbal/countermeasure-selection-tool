import { calculateVolume, calculateSingleAxis } from '../Engines/AVEngine';

class System{
    constructor(infrastructureValue, AIV, systemVolumeObject) {
        this.infrastructureValue = infrastructureValue;
        this.AIV = AIV;
        this.volumeObject = systemVolumeObject;
        this.volume = calculateVolume(systemVolumeObject);
        this.conversionFactor = this.infrastructureValue / this.volume
        this.drawParameters = Object.entries(this.volumeObject).reduce((draw, [key, value]) => {
            draw[key[0]] = calculateSingleAxis(this.volumeObject[key]);
            return draw;
        }, {});
    }
    getVolume() {
        return this.volume;
    }
    getConversionFactor() {
        return this.conversionFactor;
    }
    getVolumeObject() {
        return this.volumeObject;
    }
    getAIV() {
        return this.AIV;
    }
    getDrawParameters() {
        return this.drawParameters;
    }
}

export default System;