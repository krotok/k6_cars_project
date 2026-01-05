import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics';
import { thresholds } from './thresholds.js';

export const options = {
    vus: 50,
    duration: '5m',
    thresholds,
};

const nonEmptyRT = new Trend('search_non_empty_rt', true);
const emptyRT = new Trend('search_empty_rt', true);
const okCount = new Counter('ok_count');
const emptyCount = new Counter('empty_count');

export default function () {
    const price = Math.floor(Math.random() * 100000);
    const res = http.get(`http://search/api/search?price_lt=${price}`);

    if (res.status === 200 && res.body !== '{}' && res.json().length > 0) {
        nonEmptyRT.add(res.timings.duration);
        okCount.add(1);

        check(res, {
            'has car id': r => r.json()[0].id !== undefined,
            'has price': r => r.json()[0].price > 0,
        });
    } else {
        emptyRT.add(res.timings.duration);
        emptyCount.add(1);
    }

    sleep(0.1);
}
