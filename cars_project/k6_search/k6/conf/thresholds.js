export const thresholds = {
    http_req_failed: ['rate<0.01'],

    search_non_empty_rt: [
        'p(95)<600',
        'avg<400'
    ],

    search_empty_rt: [
        'p(95)<200'
    ]
};
