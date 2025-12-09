import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const ITEM_CODE = 'ITEM-001';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /inventory' },
        { duration: '30s', target: 100, name: 'GET /inventory/search' },
        { duration: '30s', target: 100, name: 'GET /inventory-report' },
        { duration: '30s', target: 100, name: 'GET /inventory-issued-stock' },
        { duration: '30s', target: 100, name: 'GET /inventory-received-stock' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const res = http.get(`${BASE_URL}/inventory`, { headers });
        check(res, {
            'GET /inventory Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const res = http.get(`${BASE_URL}/inventory/search?itemCode=${ITEM_CODE}`, { headers });
        check(res, {
            'GET /inventory/search Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/inventory-report`, { headers });
        check(res, {
            'GET /inventory-report Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const res = http.get(`${BASE_URL}/inventory-issued-stock`, { headers });
        check(res, {
            'GET /inventory-issued-stock Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.get(`${BASE_URL}/inventory-received-stock`, { headers });
        check(res, {
            'GET /inventory-received-stock Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    }
}

export function handleSummary(data) {
    const metrics = data.metrics;
    const totalRequests = metrics.http_reqs.values.count || 0;
    const failedRequests = (metrics.http_req_failed?.values?.rate || 0) * totalRequests;
    const successRate = (1 - (metrics.http_req_failed?.values?.rate || 0)) * 100;
    const passRate = metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : '0';

    const customSummary = `
INVENTORY API LOAD TEST RESULTS

GET ${BASE_URL}/inventory
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/inventory/search
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/inventory-report
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/inventory-issued-stock
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/inventory-received-stock
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}