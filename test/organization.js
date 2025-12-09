import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /organisation' },
        { duration: '30s', target: 100, name: 'GET /organisation/detail' },
        { duration: '30s', target: 100, name: 'PUT /organisation' },
        { duration: '30s', target: 100, name: 'POST /organisation' },
        { duration: '30s', target: 100, name: 'DELETE /organisation' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ AUTH_TOKEN }`,
};

const stage = __ENV.STAGE || '1';

if (stage === '1') {
    const res1 = http.get(`${BASE_URL}/organisation`, { headers });
    check(res1, {
        'GET /organisation Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
} else if (stage === '2') {
    const res2 = http.get(`${BASE_URL}/organisation/detail`, { headers });
    check(res2, {
        'GET /organisation/detail Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
} else if (stage === '3') {
    const payload = JSON.stringify({ organisationName: 'Updated Org', address: 'Updated Address' });
    const res3 = http.put(`${BASE_URL}/organisation`, payload, { headers });
    check(res3, {
        'PUT /organisation Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
} else if (stage === '4') {
    const payload = JSON.stringify({ organisationName: 'New Organisation', address: 'New Address', contact: '1234567890' });
    const res4 = http.post(`${BASE_URL}/organisation`, payload, { headers });
    check(res4, {
        'POST /organisation Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
} else if (stage === '5') {
    const payload = JSON.stringify({ organisationId: 'test-org-123' });
    const res5 = http.del(`${BASE_URL}/organisation`, payload, { headers });
    check(res5, {
        'DELETE /organisation Status 200-299': (r) => r.status >= 200 && r.status < 300,
    });
}
}

export function handleSummary(data) {
    const metrics = data.metrics;
    const totalRequests = metrics.http_reqs.values.count || 0;
    const failedRequests = (metrics.http_req_failed?.values?.rate || 0) * totalRequests;

    const customSummary = `
API TEST RESULTS

GET ${BASE_URL}/organisation
Auth Token: Bearer ${AUTH_TOKEN}
Success Rate: ${(1 - (metrics.http_req_failed?.values?.rate || 0)) * 100}%
Pass Rate: ${metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : "0"}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)} ms | Min ${metrics.http_req_duration.values.min.toFixed(2)} ms | Max ${metrics.http_req_duration.values.max.toFixed(2)} ms | Med ${metrics.http_req_duration.values.med.toFixed(2)} ms
Total Requests: ${totalRequests} | Failed: ${failedRequests}

GET ${BASE_URL}/organisation/detail
Auth Token: Bearer ${AUTH_TOKEN}
Success Rate: ${(1 - (metrics.http_req_failed?.values?.rate || 0)) * 100}%
Pass Rate: ${metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : "0"}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)} ms | Min ${metrics.http_req_duration.values.min.toFixed(2)} ms | Max ${metrics.http_req_duration.values.max.toFixed(2)} ms | Med ${metrics.http_req_duration.values.med.toFixed(2)} ms
Total Requests: ${totalRequests} | Failed: ${failedRequests}

PUT ${BASE_URL}/organisation
Auth Token: Bearer ${AUTH_TOKEN}
Success Rate: ${(1 - (metrics.http_req_failed?.values?.rate || 0)) * 100}%
Pass Rate: ${metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : "0"}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)} ms | Min ${metrics.http_req_duration.values.min.toFixed(2)} ms | Max ${metrics.http_req_duration.values.max.toFixed(2)} ms | Med ${metrics.http_req_duration.values.med.toFixed(2)} ms
Total Requests: ${totalRequests} | Failed: ${failedRequests}

POST ${BASE_URL}/organisation
Auth Token: Bearer ${AUTH_TOKEN}
Success Rate: ${(1 - (metrics.http_req_failed?.values?.rate || 0)) * 100}%
Pass Rate: ${metrics.checks.values.passed ? ((metrics.checks.values.passed / metrics.checks.values.count) * 100).toFixed(2) : "0"}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)} ms | Min ${metrics.http_req_duration.values.min.toFixed(2)} ms | Max ${metrics.http_req_duration.values.max.toFixed(2)} ms | Med ${metrics.http_req_duration.values.med.toFixed(2)} ms
Total Requests: ${totalRequests} | Failed: ${failedRequests}

DELETE ${BASE_URL}/organisation
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