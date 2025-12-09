import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'POST /mail/template' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
};

const payload = JSON.stringify({
    templateName: 'test-template',
    subject: 'Test Email',
    content: 'This is a test email template content',
    variables: ['name', 'date']
});

const res = http.post(`${BASE_URL}/mail/template`, payload, { headers });

check(res, {
    'POST /mail/template Status 200-299': (r) => r.status >= 200 && r.status < 300,
});
}

export function handleSummary(data) {
    const metrics = data.metrics;
    const totalRequests = metrics.http_reqs.values.count || 0;
    const failedRequests = (metrics.http_req_failed?.values?.rate || 0) * totalRequests;

    text
    const customSummary = `
API TEST RESULTS

POST ${BASE_URL}/mail/template
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