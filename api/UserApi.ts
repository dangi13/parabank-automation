import { ApiHelper } from '../helpers/api.helper';
import { APIResponse } from '@playwright/test';
import { User } from '../types/user';

export class UserApi {
  private apiHelper: ApiHelper;
  private readonly baseUrl: string = 'https://api.dummy.com/users';

  constructor(apiHelper: ApiHelper) {
    this.apiHelper = apiHelper;
  }

  async getUser(userId: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/${userId}`;
    return this.apiHelper.get(url);
  }

  async createUser(userData: User): Promise<APIResponse> {
    return this.apiHelper.post(this.baseUrl, userData);
  }

  async updateUser(userId: string, updatedData: Partial<User>): Promise<APIResponse> {
    const url = `${this.baseUrl}/${userId}`;
    return this.apiHelper.put(url, updatedData);
  }

  async deleteUser(userId: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/${userId}`;
    return this.apiHelper.delete(url);
  }
}