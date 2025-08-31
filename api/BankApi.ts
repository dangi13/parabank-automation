import { ApiHelper } from '../helpers/api.helper';
import { Transaction } from '../types/transaction';

export class BankApi {
    private apiHelper: ApiHelper;
    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    async getTransactionsByAmount(sessionId: string, accountId: string, amount: number): Promise<Transaction[] | object> {
        const url = `/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${amount}?timeout=30000`;
        const response = await this.apiHelper.get(url, {
            'Cookie': `JSESSIONID=${sessionId}`
        });

        return await response.json();
    }
}