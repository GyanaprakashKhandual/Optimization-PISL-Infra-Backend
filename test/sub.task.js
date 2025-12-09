import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://pr.avidusinteractive.com/api/web';
const AUTH_TOKEN = 'VRIMeS35VY7rmxIJeQIAKPLAsCspOzmE9Kcrb9XOoZAukmcT7qZvRDFWdTqbiOnt';
const SUBTASK_ID = '63e32cab6277aaaaf9ece185';

export const options = {
    stages: [
        { duration: '30s', target: 100, name: 'GET /subTasks' },
        { duration: '30s', target: 100, name: 'GET /subTasks/activities/:id' },
        { duration: '30s', target: 100, name: 'GET /subTasks/:id' },
        { duration: '30s', target: 100, name: 'POST /subTasks' },
        { duration: '30s', target: 100, name: 'PUT /subTasks/:id' },
        { duration: '30s', target: 100, name: 'PUT /subTasks/dailyTotalUpdate/:id' },
        { duration: '30s', target: 100, name: 'PUT /subTasks/dailyTotalUpdate/update/:id' },
        { duration: '30s', target: 100, name: 'PUT /subTasks/remarkUpdate/:id' },
        { duration: '30s', target: 100, name: 'PUT /subTasks/remarks/:id' },
        { duration: '30s', target: 100, name: 'DELETE /subTasks/:id' },
        { duration: '30s', target: 100, name: 'DELETE /subTasks/deleteMany' },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    };

    const stage = __ENV.STAGE || '1';

    if (stage === '1') {
        const res = http.get(`${BASE_URL}/subTasks`, { headers });
        check(res, {
            'GET /subTasks Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '2') {
        const res = http.get(`${BASE_URL}/subTasks/activities/${SUBTASK_ID}`, { headers });
        check(res, {
            'GET /subTasks/activities/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '3') {
        const res = http.get(`${BASE_URL}/subTasks/${SUBTASK_ID}`, { headers });
        check(res, {
            'GET /subTasks/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '4') {
        const payload = JSON.stringify({
            name: 'New Sub Task',
            description: 'Sub Task Description',
            status: 'pending',
        });
        const res = http.post(`${BASE_URL}/subTasks`, payload, { headers });
        check(res, {
            'POST /subTasks Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '5') {
        const payload = JSON.stringify({
            name: 'Updated Sub Task',
            description: 'Updated Description',
            status: 'in-progress',
        });
        const res = http.put(`${BASE_URL}/subTasks/${SUBTASK_ID}`, payload, { headers });
        check(res, {
            'PUT /subTasks/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '6') {
        const payload = JSON.stringify({
            dailyTotal: 100,
            date: '2024-12-09',
        });
        const res = http.put(`${BASE_URL}/subTasks/dailyTotalUpdate/${SUBTASK_ID}`, payload, { headers });
        check(res, {
            'PUT /subTasks/dailyTotalUpdate/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '7') {
        const payload = JSON.stringify({
            dailyTotal: 150,
            date: '2024-12-09',
        });
        const res = http.put(`${BASE_URL}/subTasks/dailyTotalUpdate/update/${SUBTASK_ID}`, payload, { headers });
        check(res, {
            'PUT /subTasks/dailyTotalUpdate/update/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '8') {
        const payload = JSON.stringify({
            remark: 'Updated Remark',
        });
        const res = http.put(`${BASE_URL}/subTasks/remarkUpdate/${SUBTASK_ID}`, payload, { headers });
        check(res, {
            'PUT /subTasks/remarkUpdate/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '9') {
        const payload = JSON.stringify({
            remarks: 'New Remarks',
        });
        const res = http.put(`${BASE_URL}/subTasks/remarks/${SUBTASK_ID}`, payload, { headers });
        check(res, {
            'PUT /subTasks/remarks/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '10') {
        const res = http.del(`${BASE_URL}/subTasks/${SUBTASK_ID}`, null, { headers });
        check(res, {
            'DELETE /subTasks/:id Status 200-299': (r) => r.status >= 200 && r.status < 300,
        });
    } else if (stage === '11') {
        const payload = JSON.stringify({
            ids: [SUBTASK_ID, 'id2', 'id3'],
        });
        const res = http.del(`${BASE_URL}/subTasks/deleteMany`, payload, { headers });
        check(res, {
            'DELETE /subTasks/deleteMany Status 200-299': (r) => r.status >= 200 && r.status < 300,
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
SUB TASKS API LOAD TEST RESULTS

GET ${BASE_URL}/subTasks
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/subTasks/activities/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

GET ${BASE_URL}/subTasks/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

POST ${BASE_URL}/subTasks
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/subTasks/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/subTasks/dailyTotalUpdate/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/subTasks/dailyTotalUpdate/update/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/subTasks/remarkUpdate/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

PUT ${BASE_URL}/subTasks/remarks/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/subTasks/${SUBTASK_ID}
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

DELETE ${BASE_URL}/subTasks/deleteMany
Success Rate: ${successRate.toFixed(2)}%
Pass Rate: ${passRate}%
Response Time: Avg ${metrics.http_req_duration.values.avg.toFixed(2)}ms | Min ${metrics.http_req_duration.values.min.toFixed(2)}ms | Max ${metrics.http_req_duration.values.max.toFixed(2)}ms

Total Requests: ${totalRequests} | Failed: ${failedRequests.toFixed(2)}

`;

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }) + '\n' + customSummary,
    };
}