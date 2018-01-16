import { calculateVolume } from '../Engines/AVEngine';

class System{
    constructor(infrastructureValue, AIV, systemVolumeObject) {
        this.infrastructureValue = infrastructureValue;
        this.AIV = AIV;
        this.volumeObject = systemVolumeObject;
        this.volume = calculateVolume(systemVolumeObject);
        this.conversionFactor = this.infrastructureValue / this.volume
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
}

export default System;