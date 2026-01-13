import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../conf/config.js'
import {
    // wrongRequestSearches,
    nonEmptySearches,
    // wrongRequestLatency,
    nonEmptySearchLatency
} from '../conf/metrics.js';

import { fetchCarDetails } from '../helpers/fetch_car_details.js';

// const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';

export function searchCarsInRange(baseUrl) {
    const min = 20000;
    const max = 60000;

    const res = http.get(
        `${BASE_URL}/search?price_gt=${min}&price_lt=${max}`
    );

    const duration = res.timings.duration;

    check(res, {
        'search status 200': r => r.status === 200,
    });

    const cars = JSON.parse(res.body);

    // if (cars.length === 0) {
    //     wrongRequestSearches.add(1);
    //     wrongRequestLatency.add(duration);
    //     return;
    // }

    nonEmptySearches.add(1);
    nonEmptySearchLatency.add(duration);

    fetchCarDetails(cars);
}
