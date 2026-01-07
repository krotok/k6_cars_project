//Run_this_file

import { searchCarsInRange } from './scenarios/search_in_range.js';
import { searchNonExistingCars } from './scenarios/search_non_existing.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';
const TEST_DURATION = __ENV.TEST_DURATION || '5m';

const TOTAL_VUS = Number(__ENV.TOTAL_VUS) || 50;

const SEARCH_VUS = Math.floor(TOTAL_VUS * 0.6);
const NON_EXISTING_VUS = Math.floor(TOTAL_VUS * 0.4);

export const options = {
    scenarios: {
        range_search: {
            executor: 'constant-vus',
            vus: SEARCH_VUS,
            duration: TEST_DURATION,
            exec: 'rangeSearch',
        },
        non_existing_search: {
            executor: 'constant-vus',
            vus: NON_EXISTING_VUS,
            duration: TEST_DURATION,
            exec: 'nonExistingSearch',
        },
    },

    
    thresholds: {          
        car_details_latency: ['p(95)<400'],
        car_details_errors: ['count<1'],
        wrong_request_latency: ['p(95)<300'],
        search_latency_non_empty: ['p(95)<500'],
    },
};

export function rangeSearch() {
    searchCarsInRange(BASE_URL);
}

export function nonExistingSearch() {
    searchNonExistingCars(BASE_URL);
}
