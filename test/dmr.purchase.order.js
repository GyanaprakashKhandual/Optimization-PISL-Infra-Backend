import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const DMR_PO_ID = '63e32cab6277aaaaf9ece185';
const PO_NUMBER = 'PO-001';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /dmr_purchase_order' },
        { duration: '30s', target: 100, name: 'PUT /dmr_purchase_order' },
        { duration: '30s', target: 100, name: 'POST /dmr_purchase_order' },
        { duration: '30s', target: 100, name: 'GET /dmr_purchase_order/detailsByPO' },
        { duration: '30s', target: 100, name: 'GET /dmr_purchase_order/open-po' },
        { duration: '30s', target: 100, name: 'GET /dmr_purchase_order/details' },
        { duration: '30s', target: 100, name: 'PUT /dmr_purchase_order/hold-dmr' },
        { duration: '30s', target: 100, name: 'PUT /dmr_purchase_order/update-closing/:id' },
        { duration: '30s', target: 100, name: 'GET /dmr_purchase_order/order-status-count' },
        { duration: '30s', target: 100, name: 'GET /dmr/getUniquePRNumber' },
        { duration: '30s', target: 100, name: 'GET /dmr/getUniquePONumber' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const res = http.get(`${BASE_URL}/dmr_purchase_order`, { headers });
        check(res, {
            'GET /dmr_purchase_order Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const payload = JSON.stringify({
            dmrPoId: DMR_PO_ID,
            status: 'active',
            remarks: 'DMR PO Updated',
        });
        const res = http.put(`${BASE_URL}/dmr_purchase_order`, payload, { headers });
        check(res, {
            'PUT /dmr_purchase_order Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const payload = JSON.stringify({
            poNumber: PO_NUMBER,
            vendorId: 'vendor123',
            status: 'open',
        });
        const res = http.post(`${BASE_URL}/dmr_purchase_order`, payload, { headers });
        check(res, {
            'POST /dmr_purchase_order Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const res = http.get(`${BASE_URL}/dmr_purchase_order/detailsByPO?poNumber=${PO_NUMBER}`, { headers });
        check(res, {
            'GET /dmr_purchase_order/detailsByPO Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.get(`${BASE_URL}/dmr_purchase_order/open-po`, { headers });
        check(res, {
            'GET /dmr_purchase_order/open-po Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const res = http.get(`${BASE_URL}/dmr_purchase_order/details`, { headers });
        check(res, {
            'GET /dmr_purchase_order/details Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const payload = JSON.stringify({
            dmrPoId: DMR_PO_ID,
            holdStatus: true,
            reason: 'Pending approval',
        });
        const res = http.put(`${BASE_URL}/dmr_purchase_order/hold-dmr`, payload, { headers });
        check(res, {
            'PUT /dmr_purchase_order/hold-dmr Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const payload = JSON.stringify({
            closingStatus: 'closed',
        });
        const res = http.put(`${BASE_URL}/dmr_purchase_order/update-closing/${DMR_PO_ID}`, payload, { headers });
        check(res, {
            'PUT /dmr_purchase_order/update-closing/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '9') {
        const res = http.get(`${BASE_URL}/dmr_purchase_order/order-status-count`, { headers });
        check(res, {
            'GET /dmr_purchase_order/order-status-count Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '10') {
        const res = http.get(`${BASE_URL}/dmr/getUniquePRNumber`, { headers });
        check(res, {
            'GET /dmr/getUniquePRNumber Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '11') {
        const res = http.get(`${BASE_URL}/dmr/getUniquePONumber`, { headers });
        check(res, {
            'GET /dmr/getUniquePONumber Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
DMR PURCHASE ORDER API LOAD TEST RESULTS

GET ${BASE_URL}/dmr_purchase_order
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/dmr_purchase_order
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/dmr_purchase_order
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_purchase_order/detailsByPO
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_purchase_order/open-po
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_purchase_order/details
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/dmr_purchase_order/hold-dmr
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/dmr_purchase_order/update-closing/:id
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_purchase_order/order-status-count
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr/getUniquePRNumber
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr/getUniquePONumber
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}