import http from 'k6/http';
import { check } from 'k6';
import { Trend, Counter } from 'k6/metrics';
import { BASE_URL } from '../conf/config.js'
//import { getPhase } from '../../utils/time_converting.js'; 

export const carDetailsLatency = new Trend('car_details_latency');
export const carDetailsRequests = new Counter('car_details_requests');
export const carDetailsErrors = new Counter('car_details_errors');

//const phase = getPhase();

export function fetchCarDetails(cars) {
    for (const car of cars) {
        const res = http.get(`${BASE_URL}/api/cars/${car.id}`);

        carDetailsRequests.add(1);
        carDetailsLatency.add(res.timings.duration);

        const ok = check(res, {
            'car details status 200': r => r.status === 200,
            'car has brand': r => JSON.parse(r.body).brand !== undefined,
            'car has price': r => JSON.parse(r.body).price > 0,
        });

        if (!ok) {
            carDetailsErrors.add(1);
        }
    }
}
