import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    search: {
      executor: 'constant-vus',
      vus: 30,
      duration: '5m',
    },
    details: {
      executor: 'constant-vus',
      vus: 15,
      duration: '5m',
    },
  },
};

export default function () {
  if (__VU % 2 === 0) {
    http.get('http://localhost:8000/api/cars/search?brand=BMW');
  } else {
    let carId = Math.floor(Math.random() * 2000) + 1;
    http.get(`http://localhost:8000/api/cars/${carId}`);
  }
  sleep(0.2);
}
