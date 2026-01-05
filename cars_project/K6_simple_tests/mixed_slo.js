import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const searchLatency = new Trend('search_latency', true);
const detailsLatency = new Trend('details_latency', true);
const errorRate = new Rate('errors');

export let options = {
  scenarios: {
    search: {
      executor: 'constant-vus',
      vus: 30,
      duration: '2m',
    },
    details: {
      executor: 'constant-vus',
      vus: 15,
      duration: '2m',
    },
  },

  thresholds: {
    'search_latency': ['p(99)<800'],
    'details_latency': ['p(99.5)<1200'],
    'errors': ['rate<0.01'],
  },
};

export default function () {
  if (__VU % 2 === 0) {
    let res = http.get('http://localhost:8000/api/cars/search');
    searchLatency.add(res.timings.duration);
    errorRate.add(res.status !== 200);
  } else {
    let carId = Math.floor(Math.random() * 2000) + 1;
    let res = http.get(`http://localhost:8000/api/cars/${carId}`);
    detailsLatency.add(res.timings.duration);
    errorRate.add(res.status !== 200);
  }

  sleep(0.2);
}
