import { Trend, Counter } from 'k6/metrics';

export const nonEmptyRT = new Trend('search_non_empty_rt', true);
export const emptyRT = new Trend('search_empty_rt', true);

export const nonEmptyCount = new Counter('search_non_empty_count');
export const emptyCount = new Counter('search_empty_count');
