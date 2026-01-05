import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// ======================
// Метрики (SLI-ready)
// ======================
const searchLatency = new Trend('search_latency', true);
const detailsLatency = new Trend('details_latency', true);
const errorRate = new Rate('errors');

// ======================
// Общие настройки
// ======================
export let options = {
  scenarios: {
    expensive_cars: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      exec: 'searchExpensiveCars',
    },
    cheap_cars: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      exec: 'searchCheapCars',
    },
    range_cars: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      exec: 'searchCarsInRange',
    },
    nonexistent_cars: {
      executor: 'constant-vus',
      vus: 5,
      duration: '2m',
      exec: 'searchNonExistingCars',
    },
  },

  thresholds: {
    search_latency: ['p(99)<800'],
    details_latency: ['p(99)<1200'],
    errors: ['rate<0.01'],
  },
};

// ======================
// Вспомогательная функция
// ======================
function searchAndMaybeCheckDetails(url) {
  let res = http.get(url);
  searchLatency.add(res.timings.duration);
  errorRate.add(res.status !== 200);

  check(res, {
    'search status 200': r => r.status === 200,
  });

  let count = res.json('count');

  // ⚠️ Пустой ответ — это НОРМАЛЬНО
  if (count > 0) {
    let carId = res.json('cars[0].id');

    let detailsRes = http.get(`http://localhost:8000/api/cars/${carId}`);
    detailsLatency.add(detailsRes.timings.duration);
    errorRate.add(detailsRes.status !== 200);

    check(detailsRes, {
      'details status 200': r => r.status === 200,
      'details id match': r => r.json('id') === carId,
    });
  }

  sleep(0.2);
}
