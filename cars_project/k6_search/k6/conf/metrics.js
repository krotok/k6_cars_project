//Complicated methrics example for analisys in Prometheus,
// Grafana, JSON
// http_req_duration.add(value, {
//   phase,
//   scenario,
//   endpoint,
//   result: empty ? 'empty' : 'non_empty',
// });

import { Trend, Counter } from 'k6/metrics';

export const nonEmptyRT = new Trend('search_non_empty_rt', true);
export const emptyRT = new Trend('search_empty_rt', true);

export const nonEmptyCount = new Counter('search_non_empty_count');
export const emptyCount = new Counter('search_empty_count');

//new metrics
export const wrongRequestSearches = new Counter('wrong_request_searches');
export const wrongRequestSearchesWarmup = new Counter('wrong_request_searches_warmup');
export const wrongRequestSearchesSteadystate = new Counter('wrong_request_searches_steadystate');
export const wrongRequestSearchesCooldown = new Counter('wrong_request_searches_cooldown');
export const nonEmptySearches = new Counter('non_empty_searches');

export const wrongRequestLatency = new Trend('wrong_request_latency');
export const wrongRequestLatencyWarmup = new Trend('wrong_request_latency_warmup');
export const wrongRequestLatencySteadystate = new Trend('wrong_request_latency_steadystate');
export const wrongRequestLatencyCooldown = new Trend('wrong_request_latency_cooldown');
export const nonEmptySearchLatency = new Trend('non_empty_search_latency');

