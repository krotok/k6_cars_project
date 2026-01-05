import http from 'k6/http';
import { Trend, sleep } from 'k6/metrics';

let slowResponses = new Trend('slow_search_latency', true);

export let options = {
  vus: 40,
  duration: '5m',
};

export default function () {
  let res = http.get('http://localhost:8000/api/cars/search');

  if (res.timings.duration > 500) {
    slowResponses.add(res.timings.duration);
  }

  sleep(0.1);
}
