import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  async get(url: string, params?: { [key: string]: string | number }): Promise<APIResponse> {
    return this.request.get(url, { params });
  }

  async post(url: string, data: any, headers?: any): Promise<APIResponse> {
    return this.request.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  async put(url: string, data: any, headers?: any): Promise<APIResponse> {
    return this.request.put(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  async delete(url: string): Promise<APIResponse> {
    return this.request.delete(url);
  }
}