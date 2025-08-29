"use client";

import { useState } from "react";

export default function TestPage() {
  const [healthStatus, setHealthStatus] = useState<string>("");
  const [webhookResult, setWebhookResult] = useState<string>("");
  const [testPayload, setTestPayload] = useState<string>(
    '{"name": "Test User", "email": "test@example.com"}'
  );

  const testHealthCheck = async () => {
    try {
      const response = await fetch("/api/health-check");
      const data = await response.json();
      setHealthStatus(JSON.stringify(data, null, 2));
    } catch (error) {
      setHealthStatus(`Error: ${error}`);
    }
  };

  const testWebhook = async () => {
    try {
      const payload = JSON.parse(testPayload);
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setWebhookResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setWebhookResult(`Error: ${error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">API Testing Page</h1>

      <div className="space-y-8">
        {/* Health Check Test */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Health Check Endpoint</h2>
          <button
            onClick={testHealthCheck}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Health Check
          </button>
          {healthStatus && (
            <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
              {healthStatus}
            </pre>
          )}
        </div>

        {/* Webhook Test */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Webhook Endpoint</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Test Payload (JSON):
            </label>
            <textarea
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full h-24 p-2 border rounded font-mono text-sm"
              placeholder='{"name": "Test User", "email": "test@example.com"}'
            />
          </div>
          <button
            onClick={testWebhook}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Webhook
          </button>
          {webhookResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
              {webhookResult}
            </pre>
          )}
        </div>

        {/* Instructions */}
        <div className="border rounded-lg p-6 bg-blue-50">
          <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Create a{" "}
              <code className="bg-gray-200 px-1 rounded">.env.local</code> file
              with your Supabase credentials
            </li>
            <li>
              Set up your Supabase project and create a{" "}
              <code className="bg-gray-200 px-1 rounded">users</code> table
            </li>
            <li>
              Use the test buttons above to verify your endpoints are working
            </li>
            <li>Check the console for any error logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
