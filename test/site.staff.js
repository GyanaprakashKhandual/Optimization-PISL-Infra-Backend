import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const SITE_STAFF_ID = '63e32cab6277aaaaf9ece185';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /siteStaff' },
        { duration: '30s', target: 100, name: 'GET /siteStaff/:id' },
        { duration: '30s', target: 100, name: 'PUT /siteStaff' },
        { duration: '30s', target: 100, name: 'POST /siteStaff' },
        { duration: '30s', target: 100, name: 'DELETE /siteStaff' },
        { duration: '30s', target: 100, name: 'POST /siteStaff/upload-csv' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const res = http.get(`${BASE_URL}/siteStaff`, { headers });
        check(res, {
            'GET /siteStaff Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const res = http.get(`${BASE_URL}/siteStaff/${SITE_STAFF_ID}`, { headers });
        check(res, {
            'GET /siteStaff/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const payload = JSON.stringify({
            name: 'Updated Staff Name',
            designation: 'Updated Designation',
            status: 'active',
        });
        const res = http.put(`${BASE_URL}/siteStaff`, payload, { headers });
        check(res, {
            'PUT /siteStaff Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const payload = JSON.stringify({
            name: 'New Staff Member',
            designation: 'Staff Designation',
            siteId: 'site123',
            status: 'active',
        });
        const res = http.post(`${BASE_URL}/siteStaff`, payload, { headers });
        check(res, {
            'POST /siteStaff Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.del(`${BASE_URL}/siteStaff`, null, { headers });
        check(res, {
            'DELETE /siteStaff Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const csvContent = 'name,designation,siteId,status\nJohn Doe,Manager,site123,active\nJane Smith,Supervisor,site123,active';
        const res = http.post(`${BASE_URL}/siteStaff/upload-csv`, csvContent, { headers });
        check(res, {
            'POST /siteStaff/upload-csv Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
SITE STAFF API LOAD TEST RESULTS

GET ${BASE_URL}/siteStaff
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/siteStaff/${SITE_STAFF_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/siteStaff
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/siteStaff
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/siteStaff
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/siteStaff/upload-csv
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}