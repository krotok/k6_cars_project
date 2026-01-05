//Run_this_file

import { searchCarsInRange } from './scenarios/search_in_range.js';
import { searchNonExistingCars } from './scenarios/search_non_existing.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';

export const options = {
    scenarios: {
        range_search: {
            executor: 'constant-vus',
            vus: 5,
            duration: '1m',
            exec: 'rangeSearch',
        },
        non_existing_search: {
            executor: 'constant-vus',
            vus: 2,
            duration: '1m',
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
