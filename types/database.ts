/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: string;
  created_at: string;
  [key: string]: any; // Allow any additional fields from webhook payload
}

export interface WebhookPayload {
  [key: string]: any; // Flexible payload structure
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  message: string;
}

export interface WebhookResponse {
  status: string;
  message: string;
  data?: User[];
  error?: string;
}
