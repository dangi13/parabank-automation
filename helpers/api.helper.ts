/* eslint-disable @typescript-eslint/no-explicit-any */
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

  async getSessionIdCookie(): Promise<string | undefined> {
    const response = await this.get('/parabank/register.htm');
    const setCookieHeader = response.headers()['set-cookie'];
    if (!setCookieHeader) {
      throw new Error('Set-Cookie header not found in the response.');
    }
    const jsessionId = setCookieHeader
      .split(';')
      .find(cookie => cookie.trim().startsWith('JSESSIONID='))
      ?.split('=')[1]
      ?.trim();
    return jsessionId;
  }
}