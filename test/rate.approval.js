import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const RA_ID = '63e32cab6277aaaaf9ece185';
const PR_NUMBER = 'PR-001';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /rate-approval' },
        { duration: '30s', target: 100, name: 'POST /rate-approval/split-comparitive' },
        { duration: '30s', target: 100, name: 'GET /rate-approval/getUniquePRNumber' },
        { duration: '30s', target: 100, name: 'GET /pending-rate-approval' },
        { duration: '30s', target: 100, name: 'POST /rate-approval-reject' },
        { duration: '30s', target: 100, name: 'GET /rate-approval/getPendingCategoryList' },
        { duration: '30s', target: 100, name: 'GET /rate-approval/getPendingPRs' },
        { duration: '30s', target: 100, name: 'GET /rate-approval/detail' },
        { duration: '30s', target: 100, name: 'GET /rate-approval-status/' },
        { duration: '30s', target: 100, name: 'GET /rate-approval/getDetailsByPR' },
        { duration: '30s', target: 100, name: 'PUT /rate-approval' },
        { duration: '30s', target: 100, name: 'PUT /rate-approval/Upload-files' },
        { duration: '30s', target: 100, name: 'DELETE /rate-approval' },
        { duration: '30s', target: 100, name: 'PUT /rate-approval/merge-rate-comparatives' },
        { duration: '30s', target: 100, name: 'DELETE /rate-approval/markLocalPurchase' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const res = http.get(`${BASE_URL}/rate-approval`, { headers });
        check(res, {
            'GET /rate-approval Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const payload = JSON.stringify({
            prNumber: PR_NUMBER,
            vendors: ['vendor1', 'vendor2'],
        });
        const res = http.post(`${BASE_URL}/rate-approval/split-comparitive`, payload, { headers });
        check(res, {
            'POST /rate-approval/split-comparitive Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/rate-approval/getUniquePRNumber`, { headers });
        check(res, {
            'GET /rate-approval/getUniquePRNumber Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const res = http.get(`${BASE_URL}/pending-rate-approval`, { headers });
        check(res, {
            'GET /pending-rate-approval Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const payload = JSON.stringify({
            raId: RA_ID,
            reason: 'Rejected due to budget constraints',
        });
        const res = http.post(`${BASE_URL}/rate-approval-reject`, payload, { headers });
        check(res, {
            'POST /rate-approval-reject Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const res = http.get(`${BASE_URL}/rate-approval/getPendingCategoryList`, { headers });
        check(res, {
            'GET /rate-approval/getPendingCategoryList Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const res = http.get(`${BASE_URL}/rate-approval/getPendingPRs`, { headers });
        check(res, {
            'GET /rate-approval/getPendingPRs Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const res = http.get(`${BASE_URL}/rate-approval/detail`, { headers });
        check(res, {
            'GET /rate-approval/detail Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '9') {
        const res = http.get(`${BASE_URL}/rate-approval-status/`, { headers });
        check(res, {
            'GET /rate-approval-status/ Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '10') {
        const res = http.get(`${BASE_URL}/rate-approval/getDetailsByPR?prNumber=${PR_NUMBER}`, { headers });
        check(res, {
            'GET /rate-approval/getDetailsByPR Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '11') {
        const payload = JSON.stringify({
            raId: RA_ID,
            status: 'approved',
            selectedVendor: 'vendor1',
        });
        const res = http.put(`${BASE_URL}/rate-approval`, payload, { headers });
        check(res, {
            'PUT /rate-approval Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '12') {
        const payload = JSON.stringify({
            raId: RA_ID,
            files: ['file1.pdf', 'file2.pdf'],
        });
        const res = http.put(`${BASE_URL}/rate-approval/Upload-files`, payload, { headers });
        check(res, {
            'PUT /rate-approval/Upload-files Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '13') {
        const res = http.del(`${BASE_URL}/rate-approval`, null, { headers });
        check(res, {
            'DELETE /rate-approval Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '14') {
        const payload = JSON.stringify({
            raIds: [RA_ID, 'id2', 'id3'],
        });
        const res = http.put(`${BASE_URL}/rate-approval/merge-rate-comparatives`, payload, { headers });
        check(res, {
            'PUT /rate-approval/merge-rate-comparatives Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '15') {
        const payload = JSON.stringify({
            raId: RA_ID,
            vendorId: 'vendor1',
        });
        const res = http.del(`${BASE_URL}/rate-approval/markLocalPurchase`, payload, { headers });
        check(res, {
            'DELETE /rate-approval/markLocalPurchase Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
RATE APPROVAL API LOAD TEST RESULTS

GET ${BASE_URL}/rate-approval
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/rate-approval/split-comparitive
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/rate-approval/getUniquePRNumber
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/pending-rate-approval
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/rate-approval-reject
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/rate-approval/getPendingCategoryList
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/rate-approval/getPendingPRs
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/rate-approval/detail
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/rate-approval-status/
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/rate-approval/getDetailsByPR
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/rate-approval
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/rate-approval/Upload-files
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/rate-approval
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/rate-approval/merge-rate-comparatives
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/rate-approval/markLocalPurchase
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}