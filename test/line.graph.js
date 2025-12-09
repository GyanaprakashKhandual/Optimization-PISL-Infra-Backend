import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const LINE_GRAPH_ID = '63e32cab6277aaaaf9ece187';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /lineGraph' },
        { duration: '30s', target: 100, name: 'GET /lineGraph/:id' },
        { duration: '30s', target: 100, name: 'POST /lineGraph/date-filter' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

const stage = __ENV.STAGE || '1';

if (stage === '1') {
    const res1 = http.get(`${BASE_URL}/lineGraph`, { headers });
    check(res1, {
        'GET /lineGraph Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
} else if (stage === '2') {
    const res2 = http.get(`${BASE_URL}/lineGraph/${LINE_GRAPH_ID}`, { headers });
    check(res2, {
        'GET /lineGraph/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
} else if (stage === '3') {
    const payload = JSON.stringify({
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        graphType: 'performance'
    });
    const res3 = http.post(`${BASE_URL}/lineGraph/date-filter`, payload, { headers });
    check(res3, {
        'POST /lineGraph/date-filter Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
}
}

export function handleSummary(data) {
    const metrics = data.metrics;
    const totalRequests = metrics.http_reqs.values.count || 0;
    const failedRequests = (metrics.http_req_failed?.values?.rate || 0) * totalRequests;

    const customSummary = `
API TEST RESULTS

GET ${BASE_URL}/lineGraph
Auth Token: Bearer ${AUTH_TOKEN}
Success Rate: ${(1 - (metrics.http_req_failed?.values?.rate || 0)) * 100}%
Pass Rate: ${metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : "0"}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)} ms | Min ${metrics.http_req_duration.values.min.toFixed(2)} ms | Max ${metrics.http_req_duration.values.max.toFixed(2)} ms | Med ${metrics.http_req_duration.values.med.toFixed(2)} ms
Total Requests: ${totalRequests} | Failed: ${failedRequests}

GET ${BASE_URL}/lineGraph/${LINE_GRAPH_ID}
Auth Token: Bearer ${AUTH_TOKEN}
Success Rate: ${(1 - (metrics.http_req_failed?.values?.rate || 0)) * 100}%
Pass Rate: ${metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : "0"}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)} ms | Min ${metrics.http_req_duration.values.min.toFixed(2)} ms | Max ${metrics.http_req_duration.values.max.toFixed(2)} ms | Med ${metrics.http_req_duration.values.med.toFixed(2)} ms
Total Requests: ${totalRequests} | Failed: ${failedRequests}

POST ${BASE_URL}/lineGraph/date-filter
Auth Token: Bearer ${AUTH_TOKEN}
Success Rate: ${(1 - (metrics.http_req_failed?.values?.rate || 0)) * 100}%
Pass Rate: ${metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : "0"}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)} ms | Min ${metrics.http_req_duration.values.min.toFixed(2)} ms | Max ${metrics.http_req_duration.values.max.toFixed(2)} ms | Med ${metrics.http_req_duration.values.med.toFixed(2)} ms
Total Requests: ${totalRequests} | Failed: ${failedRequests}

`;
    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}

