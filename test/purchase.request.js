import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const PR_ID = '63e32cab6277aaaaf9ece185';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /purchase-request' },
        { duration: '30s', target: 100, name: 'GET /purchase-request-status/' },
        { duration: '30s', target: 100, name: 'GET /local-rate-approval-status/' },
        { duration: '30s', target: 100, name: 'GET /next-purchase-request/' },
        { duration: '30s', target: 100, name: 'GET /local-purchase-approvals/' },
        { duration: '30s', target: 100, name: 'GET /purchase-request/detail' },
        { duration: '30s', target: 100, name: 'PUT /purchase-request' },
        { duration: '30s', target: 100, name: 'PUT /purchase-request/reject-request' },
        { duration: '30s', target: 100, name: 'PUT /edit-purchase-request' },
        { duration: '30s', target: 100, name: 'POST /purchase-request' },
        { duration: '30s', target: 100, name: 'DELETE /purchase-request' },
        { duration: '30s', target: 100, name: 'GET /purchase-request/prHistory' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const res = http.get(`${BASE_URL}/purchase-request`, { headers });
        check(res, {
            'GET /purchase-request Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const res = http.get(`${BASE_URL}/purchase-request-status/`, { headers });
        check(res, {
            'GET /purchase-request-status/ Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/local-rate-approval-status/`, { headers });
        check(res, {
            'GET /local-rate-approval-status/ Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const res = http.get(`${BASE_URL}/next-purchase-request/`, { headers });
        check(res, {
            'GET /next-purchase-request/ Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.get(`${BASE_URL}/local-purchase-approvals/`, { headers });
        check(res, {
            'GET /local-purchase-approvals/ Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const res = http.get(`${BASE_URL}/purchase-request/detail`, { headers });
        check(res, {
            'GET /purchase-request/detail Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const payload = JSON.stringify({
            prNumber: 'PR-001',
            status: 'approved',
            description: 'Purchase Request Updated',
        });
        const res = http.put(`${BASE_URL}/purchase-request`, payload, { headers });
        check(res, {
            'PUT /purchase-request Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const payload = JSON.stringify({
            prId: PR_ID,
            reason: 'Not required',
        });
        const res = http.put(`${BASE_URL}/purchase-request/reject-request`, payload, { headers });
        check(res, {
            'PUT /purchase-request/reject-request Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '9') {
        const payload = JSON.stringify({
            prId: PR_ID,
            description: 'Edited Purchase Request',
            quantity: 100,
        });
        const res = http.put(`${BASE_URL}/edit-purchase-request`, payload, { headers });
        check(res, {
            'PUT /edit-purchase-request Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '10') {
        const payload = JSON.stringify({
            itemCode: 'ITEM-001',
            quantity: 50,
            description: 'New Purchase Request',
            siteId: 'site123',
        });
        const res = http.post(`${BASE_URL}/purchase-request`, payload, { headers });
        check(res, {
            'POST /purchase-request Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '11') {
        const res = http.del(`${BASE_URL}/purchase-request`, null, { headers });
        check(res, {
            'DELETE /purchase-request Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '12') {
        const res = http.get(`${BASE_URL}/purchase-request/prHistory`, { headers });
        check(res, {
            'GET /purchase-request/prHistory Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
PURCHASE REQUEST API LOAD TEST RESULTS

GET ${BASE_URL}/purchase-request
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/purchase-request-status/
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/local-rate-approval-status/
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/next-purchase-request/
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/local-purchase-approvals/
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/purchase-request/detail
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/purchase-request
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/purchase-request/reject-request
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/edit-purchase-request
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/purchase-request
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/purchase-request
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/purchase-request/prHistory
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}