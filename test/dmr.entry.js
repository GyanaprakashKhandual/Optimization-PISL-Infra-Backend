import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const DMR_ID = '63e32cab6277aaaaf9ece185';
const PO_NUMBER = 'PO-001';
const INVOICE_NUMBER = 'INV-001';
const CHALLAN_NUMBER = 'CHAL-001';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'POST /dmr_entry' },
        { duration: '30s', target: 100, name: 'PUT /dmr_entry/updateDMREntries' },
        { duration: '30s', target: 100, name: 'GET /dmr_entry/open_challan' },
        { duration: '30s', target: 100, name: 'GET /dmr_list' },
        { duration: '30s', target: 100, name: 'GET /dmr_purchase_order/check-duplicate-invoice' },
        { duration: '30s', target: 100, name: 'GET /dmr_purchase_order/check-duplicate-challan' },
        { duration: '30s', target: 100, name: 'GET /dmr_entry_status' },
        { duration: '30s', target: 100, name: 'GET /dmr_entry/validate-gate-entry' },
        { duration: '30s', target: 100, name: 'PUT /dmr_entry' },
        { duration: '30s', target: 100, name: 'GET /getDMRNumber' },
        { duration: '30s', target: 100, name: 'GET /getDMRNumberList' },
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
            poNumber: PO_NUMBER,
            invoiceNumber: INVOICE_NUMBER,
            challanNumber: CHALLAN_NUMBER,
            quantity: 100,
            vendorId: 'vendor123',
        });
        const res = http.post(`${BASE_URL}/dmr_entry`, payload, { headers });
        check(res, {
            'POST /dmr_entry Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const payload = JSON.stringify({
            dmrEntries: [
                { dmrId: DMR_ID, quantity: 150, status: 'updated' },
            ],
        });
        const res = http.put(`${BASE_URL}/dmr_entry/updateDMREntries`, payload, { headers });
        check(res, {
            'PUT /dmr_entry/updateDMREntries Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/dmr_entry/open_challan`, { headers });
        check(res, {
            'GET /dmr_entry/open_challan Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const res = http.get(`${BASE_URL}/dmr_list`, { headers });
        check(res, {
            'GET /dmr_list Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.get(`${BASE_URL}/dmr_purchase_order/check-duplicate-invoice?invoiceNumber=${INVOICE_NUMBER}`, { headers });
        check(res, {
            'GET /dmr_purchase_order/check-duplicate-invoice Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const res = http.get(`${BASE_URL}/dmr_purchase_order/check-duplicate-challan?challanNumber=${CHALLAN_NUMBER}`, { headers });
        check(res, {
            'GET /dmr_purchase_order/check-duplicate-challan Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const res = http.get(`${BASE_URL}/dmr_entry_status`, { headers });
        check(res, {
            'GET /dmr_entry_status Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const res = http.get(`${BASE_URL}/dmr_entry/validate-gate-entry?challanNumber=${CHALLAN_NUMBER}`, { headers });
        check(res, {
            'GET /dmr_entry/validate-gate-entry Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '9') {
        const payload = JSON.stringify({
            dmrId: DMR_ID,
            status: 'approved',
            remarks: 'DMR Entry Updated',
        });
        const res = http.put(`${BASE_URL}/dmr_entry`, payload, { headers });
        check(res, {
            'PUT /dmr_entry Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '10') {
        const res = http.get(`${BASE_URL}/getDMRNumber`, { headers });
        check(res, {
            'GET /getDMRNumber Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '11') {
        const res = http.get(`${BASE_URL}/getDMRNumberList`, { headers });
        check(res, {
            'GET /getDMRNumberList Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
DMR ENTRY API LOAD TEST RESULTS

POST ${BASE_URL}/dmr_entry
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/dmr_entry/updateDMREntries
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_entry/open_challan
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_list
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_purchase_order/check-duplicate-invoice
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_purchase_order/check-duplicate-challan
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_entry_status
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/dmr_entry/validate-gate-entry
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/dmr_entry
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getDMRNumber
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/getDMRNumberList
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}