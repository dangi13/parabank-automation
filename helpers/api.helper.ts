import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(url, { headers });
  }

  async post(url: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  async put(url: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.put(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  async delete(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(url, { headers });
  }
}