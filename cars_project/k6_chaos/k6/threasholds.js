export const thresholds = {
    http_req_failed: ['rate<0.005'],
    search_non_empty_rt: ['p(95)<500'],
    search_empty_rt: ['p(95)<200'],
};
