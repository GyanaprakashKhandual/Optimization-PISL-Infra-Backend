import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const IMPREST_DMR_ID = '63e32cab6277aaaaf9ece185';
const SITE_ID = 'site123';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'POST /imprest_dmr_entry' },
        { duration: '30s', target: 100, name: 'GET /imprest_dmr_list/uniqueDMRNumber' },
        { duration: '30s', target: 100, name: 'GET /imprest_dmr_list' },
        { duration: '30s', target: 100, name: 'GET /imprest_dmr_list/check-duplicate-bill' },
        { duration: '30s', target: 100, name: 'PUT /imprest_dmr_entry' },
        { duration: '30s', target: 100, name: 'PUT /imprest_dmr_entry/doc_submission' },
        { duration: '30s', target: 100, name: 'GET /imprest_dmr_entry/detail' },
        { duration: '30s', target: 100, name: 'GET /getImprestNumberBySite' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const payload = JSON.stringify({
            siteId: SITE_ID,
            vendorId: 'vendor123',
            billNumber: 'BILL-001',
            billAmount: 50000,
            billDate: '2024-12-09',
        });
        const res = http.post(`${BASE_URL}/imprest_dmr_entry`, payload, { headers });
        check(res, {
            'POST /imprest_dmr_entry Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const res = http.get(`${BASE_URL}/imprest_dmr_list/uniqueDMRNumber`, { headers });
        check(res, {
            'GET /imprest_dmr_list/uniqueDMRNumber Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/imprest_dmr_list`, { headers });
        check(res, {
            'GET /imprest_dmr_list Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const res = http.get(`${BASE_URL}/imprest_dmr_list/check-duplicate-bill?billNumber=BILL-001`, { headers });
        check(res, {
            'GET /imprest_dmr_list/check-duplicate-bill Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const payload = JSON.stringify({
            imprestDmrId: IMPREST_DMR_ID,
            status: 'approved',
            remarks: 'Imprest DMR Entry Updated',
        });
        const res = http.put(`${BASE_URL}/imprest_dmr_entry`, payload, { headers });
        check(res, {
            'PUT /imprest_dmr_entry Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const payload = JSON.stringify({
            imprestDmrId: IMPREST_DMR_ID,
            documents: ['doc1.pdf', 'doc2.pdf'],
            submissionDate: '2024-12-09',
        });
        const res = http.put(`${BASE_URL}/imprest_dmr_entry/doc_submission`, payload, { headers });
        check(res, {
            'PUT /imprest_dmr_entry/doc_submission Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const res = http.get(`${BASE_URL}/imprest_dmr_entry/detail`, { headers });
        check(res, {
            'GET /imprest_dmr_entry/detail Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const res = http.get(`${BASE_URL}/getImprestNumberBySite?siteId=${SITE_ID}`, { headers });
        check(res, {
            'GET /getImprestNumberBySite Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
IMPREST DMR ENTRY API LOAD TEST RESULTS

POST ${BASE_URL}/imprest_dmr_entry
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/imprest_dmr_list/uniqueDMRNumber
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/imprest_dmr_list
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/imprest_dmr_list/check-duplicate-bill
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/imprest_dmr_entry
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/imprest_dmr_entry/doc_submission
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/imprest_dmr_entry/detail
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getImprestNumberBySite
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}