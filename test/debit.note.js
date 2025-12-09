import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const DEBIT_NOTE_ID = '63e32cab6277aaaaf9ece185';
const DMR_ID = '63e32cab6277aaaaf9ece186';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'POST /debitNote' },
        { duration: '30s', target: 100, name: 'GET /debitNote' },
        { duration: '30s', target: 100, name: 'GET /debitNote/open-debit-invoices' },
        { duration: '30s', target: 100, name: 'PUT /debitNote' },
        { duration: '30s', target: 100, name: 'GET /debitNote/getDebitNoteFromDmr' },
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
            vendorId: 'vendor123',
            invoiceNumber: 'INV-001',
            debitAmount: 10000,
            reason: 'Quality Issues',
            dmrId: DMR_ID,
        });
        const res = http.post(`${BASE_URL}/debitNote`, payload, { headers });
        check(res, {
            'POST /debitNote Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const res = http.get(`${BASE_URL}/debitNote`, { headers });
        check(res, {
            'GET /debitNote Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/debitNote/open-debit-invoices`, { headers });
        check(res, {
            'GET /debitNote/open-debit-invoices Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const payload = JSON.stringify({
            debitNoteId: DEBIT_NOTE_ID,
            status: 'approved',
            approvedBy: 'manager123',
        });
        const res = http.put(`${BASE_URL}/debitNote`, payload, { headers });
        check(res, {
            'PUT /debitNote Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const res = http.get(`${BASE_URL}/debitNote/getDebitNoteFromDmr?dmrId=${DMR_ID}`, { headers });
        check(res, {
            'GET /debitNote/getDebitNoteFromDmr Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
DEBIT NOTE API LOAD TEST RESULTS

POST ${BASE_URL}/debitNote
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/debitNote
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/debitNote/open-debit-invoices
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/debitNote
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/debitNote/getDebitNoteFromDmr
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}