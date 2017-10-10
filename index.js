import System from './models/system';
import Attack from './models/attack';
import Countermeasure from './models/countermeasure';

import { systemVolumeLarge } from './test/sampleTestData';

// First define all system in index.js
// then lookup for database

// Define a System object
const system = new System(4000, 500, systemVolumeLarge);
console.log(system.getAIV());
console.log(system.getConversionFactor());
console.log(system.getVolume());
console.log(system.getVolumeObject());

// single attack or multiple attacks
const attack = new Attack('R(1-2,4-6)C(3,5)U(1-6)', 12, system);
console.log(attack.getALE());
console.log(attack.getVolumeObject());

// single CM or multiple CM
const countermeasure = new Countermeasure('R(1-2,4-5)C(3)U(1-4)', 80, 400, system);
console.log(countermeasure.getARC());
console.log(countermeasure.getCoverage(attack.getVolumeObject()));
console.log(countermeasure.getRM(attack.getVolumeObject()));