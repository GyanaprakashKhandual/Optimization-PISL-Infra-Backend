import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const TRANSFER_ID = '63e32cab6277aaaaf9ece185';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'POST /inventory-transfer/create_request' },
        { duration: '30s', target: 100, name: 'PUT /inventory-transfer/approve' },
        { duration: '30s', target: 100, name: 'PUT /inventory-transfer/dispatch' },
        { duration: '30s', target: 100, name: 'PUT /inventory-transfer/receive' },
        { duration: '30s', target: 100, name: 'DELETE /inventory-transfer/cancel/:id' },
        { duration: '30s', target: 100, name: 'GET /inventory-transfer/details' },
        { duration: '30s', target: 100, name: 'GET /inventory-transfer' },
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
            fromSiteId: 'site123',
            toSiteId: 'site456',
            items: [
                { itemCode: 'ITEM-001', quantity: 50 },
            ],
            reason: 'Inventory Transfer Request',
        });
        const res = http.post(`${BASE_URL}/inventory-transfer/create_request`, payload, { headers });
        check(res, {
            'POST /inventory-transfer/create_request Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const payload = JSON.stringify({
            transferId: TRANSFER_ID,
            approvedBy: 'manager123',
            approvalDate: '2024-12-09',
        });
        const res = http.put(`${BASE_URL}/inventory-transfer/approve`, payload, { headers });
        check(res, {
            'PUT /inventory-transfer/approve Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const payload = JSON.stringify({
            transferId: TRANSFER_ID,
            dispatchDate: '2024-12-09',
            dispatchedBy: 'staff123',
        });
        const res = http.put(`${BASE_URL}/inventory-transfer/dispatch`, payload, { headers });
        check(res, {
            'PUT /inventory-transfer/dispatch Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const payload = JSON.stringify({
            transferId: TRANSFER_ID,
            receivedDate: '2024-12-09',
            receivedBy: 'staff456',
            remarks: 'Items received in good condition',
        });
        const res = http.put(`${BASE_URL}/inventory-transfer/receive`, payload, { headers });
        check(res, {
            'PUT /inventory-transfer/receive Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.del(`${BASE_URL}/inventory-transfer/cancel/${TRANSFER_ID}`, null, { headers });
        check(res, {
            'DELETE /inventory-transfer/cancel/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const res = http.get(`${BASE_URL}/inventory-transfer/details`, { headers });
        check(res, {
            'GET /inventory-transfer/details Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const res = http.get(`${BASE_URL}/inventory-transfer`, { headers });
        check(res, {
            'GET /inventory-transfer Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
INVENTORY TRANSFER API LOAD TEST RESULTS

POST ${BASE_URL}/inventory-transfer/create_request
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/inventory-transfer/approve
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/inventory-transfer/dispatch
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/inventory-transfer/receive
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/inventory-transfer/cancel/:id
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/inventory-transfer/details
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/inventory-transfer
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}