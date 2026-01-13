//Run_this_file

import { searchCarsInRange } from './k6/scenarios/search_in_range.js';
import { searchNonExistingCars } from './k6/scenarios/search_non_existing.js';
import { WARMUP, COOLDOWN, TEST_DURATION, PHASE_CONFIG } from './k6/conf/config.js';
import { scenario, vu } from 'k6/execution';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';
const TOTAL_VUS = Number(__ENV.TOTAL_VUS) || 50;
const SEARCH_VUS = Math.floor(TOTAL_VUS * 0.6);
const NON_EXISTING_VUS = Math.floor(TOTAL_VUS * 0.4);
const testStart = Date.now()

export function setup() {
    return {
        testStartTime: Date.now(),
    };
}

export const options = {
    scenarios: {
        range_search: {
            executor: 'ramping-vus',
            exec: 'rangeSearch',
            stages: [
                { duration: `${PHASE_CONFIG.warmupSec}s`, target: SEARCH_VUS },
                { duration: `${PHASE_CONFIG.steadySec}s`, target: SEARCH_VUS },
                { duration: `${PHASE_CONFIG.cooldownSec}s`, target: 0 },
            ],
        },
        non_existing_search: {
            executor: 'ramping-vus',
            exec: 'nonExistingSearch',
            stages: [
                { duration: `${PHASE_CONFIG.warmupSec}s`, target: NON_EXISTING_VUS },
                { duration: `${PHASE_CONFIG.steadySec}s`, target: NON_EXISTING_VUS },
                { duration: `${PHASE_CONFIG.cooldownSec}s`, target: 0 },
            ],
        },
    },

    thresholds: {          
        car_details_latency: ['p(95)<400'],
        car_details_errors: ['count<1'],
        'wrong_request_latency{phase:steady}': ['p(95)<300'],
        non_empty_search_latency: ['p(95)<500'],
    },
};

export function rangeSearch() {
    searchCarsInRange();
}

export function nonExistingSearch(data) {
    //console.log('VU:', vu.idInInstance); //show VU context

    const elapsedSec = (Date.now() - data.testStartTime) / 1000;
    //console.log(`Elapsed: ${elapsedSec.toFixed(1)} sec`);
    searchNonExistingCars(elapsedSec, PHASE_CONFIG);
}

