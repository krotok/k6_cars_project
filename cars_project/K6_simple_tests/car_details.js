import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '5m',
};

export default function () {
  let carId = Math.floor(Math.random() * 2000) + 1;
  http.get(`http://localhost:8000/api/cars/${carId}`);
  sleep(0.2);
}
