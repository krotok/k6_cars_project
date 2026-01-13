import http from 'k6/http';
import { getPhase } from '../../utils/get_tags.js';
import { BASE_URL, WARMUP_MS, WARMUP_STEADYSTAY_MS } from '../conf/config.js'

import {
    wrongRequestSearches, wrongRequestLatency,

} from '../conf/metrics.js';

export function searchNonExistingCars(elapsedSec, phaseConfig) {

    //console.log(JSON.stringify(phaseConfig, null, 2));
    const phase = getPhase(elapsedSec, phaseConfig);

    const res = http.get(
        `${BASE_URL}/search?brand=NOT_EXISTING_BRAND`
    );

    wrongRequestSearches.add(1, { phase });
    wrongRequestLatency.add(res.timings.duration, { phase });


}
