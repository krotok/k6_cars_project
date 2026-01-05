import http from 'k6/http';
import { check, sleep } from 'k6';

const brands = ['BMW', 'Audi', 'Tesla', 'Toyota', 'Mercedes'];
const engines = ['petrol', 'diesel', 'hybrid', 'electric'];

export let options = {
  vus: 30,
  duration: '5m',
};

export default function () {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const engine = engines[Math.floor(Math.random() * engines.length)];

  let res = http.get(
    `http://localhost:8000/api/cars/search?brand=${brand}&engine_type=${engine}`
  );

  check(res, {
    'status 200': r => r.status === 200,
    'cars returned': r => r.json('count') >= 0,
  });

  sleep(0.3);
}
