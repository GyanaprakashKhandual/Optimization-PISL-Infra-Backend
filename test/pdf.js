import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const PO_ID = '63e32cab6277aaaaf9ece185';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'POST /generate/pdf' },
        { duration: '30s', target: 100, name: 'POST /generate/localPO-pdf' },
        { duration: '30s', target: 100, name: 'POST /generate/DMR-Inventory-pdf' },
        { duration: '30s', target: 100, name: 'POST /generate/material-gatePass' },
        { duration: '30s', target: 100, name: 'POST /generate/debitNote-pdf' },
        { duration: '30s', target: 100, name: 'POST /generate/prpdf' },
        { duration: '30s', target: 100, name: 'POST /generate/issueSlip' },
        { duration: '30s', target: 100, name: 'POST /generate/rcpdf' },
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
            poId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/pdf`, payload, { headers });
        check(res, {
            'POST /generate/pdf Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const payload = JSON.stringify({
            poId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/localPO-pdf`, payload, { headers });
        check(res, {
            'POST /generate/localPO-pdf Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const payload = JSON.stringify({
            dmrId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/DMR-Inventory-pdf`, payload, { headers });
        check(res, {
            'POST /generate/DMR-Inventory-pdf Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const payload = JSON.stringify({
            gatePassId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/material-gatePass`, payload, { headers });
        check(res, {
            'POST /generate/material-gatePass Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const payload = JSON.stringify({
            debitNoteId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/debitNote-pdf`, payload, { headers });
        check(res, {
            'POST /generate/debitNote-pdf Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const payload = JSON.stringify({
            prId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/prpdf`, payload, { headers });
        check(res, {
            'POST /generate/prpdf Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const payload = JSON.stringify({
            issueSlipId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/issueSlip`, payload, { headers });
        check(res, {
            'POST /generate/issueSlip Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const payload = JSON.stringify({
            rcId: PO_ID,
        });
        const res = http.post(`${BASE_URL}/generate/rcpdf`, payload, { headers });
        check(res, {
            'POST /generate/rcpdf Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
PDF GENERATION API LOAD TEST RESULTS

POST ${BASE_URL}/generate/pdf
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/generate/localPO-pdf
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/generate/DMR-Inventory-pdf
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/generate/material-gatePass
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/generate/debitNote-pdf
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/generate/prpdf
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/generate/issueSlip
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/generate/rcpdf
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}