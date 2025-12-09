import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const PO_ID = '63e32cab6277aaaaf9ece185';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /purchase_order' },
        { duration: '30s', target: 100, name: 'GET /purchase_order/detail' },
        { duration: '30s', target: 100, name: 'GET /getPONumber' },
        { duration: '30s', target: 100, name: 'GET /getPONumber/plantMachinery' },
        { duration: '30s', target: 100, name: 'GET /getPOStatusCount' },
        { duration: '30s', target: 100, name: 'POST /mergePO' },
        { duration: '30s', target: 100, name: 'GET /getPendingPOByVendors' },
        { duration: '30s', target: 100, name: 'GET /getPendingPOVendorsBySite' },
        { duration: '30s', target: 100, name: 'PUT /purchase_order' },
        { duration: '30s', target: 100, name: 'DELETE /purchase_order' },
        { duration: '30s', target: 100, name: 'PUT /purchase_order/reviseOrder' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const res = http.get(`${BASE_URL}/purchase_order`, { headers });
        check(res, {
            'GET /purchase_order Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const res = http.get(`${BASE_URL}/purchase_order/detail`, { headers });
        check(res, {
            'GET /purchase_order/detail Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/getPONumber`, { headers });
        check(res, {
            'GET /getPONumber Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const res = http.get(`${BASE_URL}/getPONumber/plantMachinery`, { headers });
        check(res, {
            'GET /getPONumber/plantMachinery Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.get(`${BASE_URL}/getPOStatusCount`, { headers });
        check(res, {
            'GET /getPOStatusCount Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const payload = JSON.stringify({
            poIds: [PO_ID, 'id2', 'id3'],
            mergedPoNumber: 'PO-MERGED-001',
        });
        const res = http.post(`${BASE_URL}/mergePO`, payload, { headers });
        check(res, {
            'POST /mergePO Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const res = http.get(`${BASE_URL}/getPendingPOByVendors`, { headers });
        check(res, {
            'GET /getPendingPOByVendors Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const res = http.get(`${BASE_URL}/getPendingPOVendorsBySite`, { headers });
        check(res, {
            'GET /getPendingPOVendorsBySite Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '9') {
        const payload = JSON.stringify({
            poId: PO_ID,
            status: 'approved',
            description: 'Purchase Order Updated',
        });
        const res = http.put(`${BASE_URL}/purchase_order`, payload, { headers });
        check(res, {
            'PUT /purchase_order Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '10') {
        const res = http.del(`${BASE_URL}/purchase_order`, null, { headers });
        check(res, {
            'DELETE /purchase_order Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '11') {
        const payload = JSON.stringify({
            poId: PO_ID,
            revisionNumber: 2,
            changes: 'Quantity updated',
        });
        const res = http.put(`${BASE_URL}/purchase_order/reviseOrder`, payload, { headers });
        check(res, {
            'PUT /purchase_order/reviseOrder Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
PURCHASE ORDER API LOAD TEST RESULTS

GET ${BASE_URL}/purchase_order
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/purchase_order/detail
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getPONumber
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getPONumber/plantMachinery
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getPOStatusCount
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/mergePO
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getPendingPOByVendors
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getPendingPOVendorsBySite
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/purchase_order
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/purchase_order
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/purchase_order/reviseOrder
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}