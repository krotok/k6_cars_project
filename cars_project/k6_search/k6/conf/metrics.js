import { Trend, Counter } from 'k6/metrics';

export const nonEmptyRT = new Trend('search_non_empty_rt', true);
export const emptyRT = new Trend('search_empty_rt', true);

export const nonEmptyCount = new Counter('search_non_empty_count');
export const emptyCount = new Counter('search_empty_count');

//new metrics
export const wrongRequestSearches = new Counter('wrong_request_searches');
export const nonEmptySearches = new Counter('non_empty_searches');

export const wrongRequestLatency = new Trend('wrong_request_latency');
export const searchLatencyNonEmpty = new Trend('search_latency_non_empty');
