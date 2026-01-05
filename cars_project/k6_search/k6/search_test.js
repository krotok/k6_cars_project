import http from 'k6/http';
import { sleep, check } from 'k6';

import {
    searchExpensiveCars,
    searchCheapCars,
    searchCarsInRange,
    searchNonExistingCars
} from './scenarios.js';

import {
    nonEmptyRT,
    emptyRT,
    nonEmptyCount,
    emptyCount
} from './metrics.js';

import { thresholds } from './thresholds.js';

export const options = {
    vus: 40,
    duration: '1m',
    thresholds
};

const BASE_URL = 'http://localhost:8000';

export default function () {
    const r = Math.random();

    let path;

    if (r < 0.25) {
        path = searchExpensiveCars();
    } else if (r < 0.5) {
        path = searchCheapCars();
    } else if (r < 0.75) {
        path = searchCarsInRange();
    } else {
        path = searchNonExistingCars();
    }

    const res = http.get(BASE_URL + path);

    if (res.status === 200 && res.json().length > 0) {
        nonEmptyRT.add(res.timings.duration);
        nonEmptyCount.add(1);

        check(res, {
            'has id': r => r.json()[0].id !== undefined,
            'has price': r => r.json()[0].price > 0,
        });
    } else {
        emptyRT.add(res.timings.duration);
        emptyCount.add(1);
    }

    sleep(0.1);
}
