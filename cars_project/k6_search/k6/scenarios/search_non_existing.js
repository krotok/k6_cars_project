import http from 'k6/http';
import { wrongRequestSearches, wrongRequestLatency } from '../conf/metrics.js';

//const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';

export function searchNonExistingCars(baseUrl) {
    const res = http.get(
        `${baseUrl}/search?brand=NOT_EXISTING_BRAND`
    );

    wrongRequestSearches.add(1);
    wrongRequestLatency.add(res.timings.duration);
}
