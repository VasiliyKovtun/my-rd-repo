import { APIRequestContext, APIResponse } from '@playwright/test';

export class IncomeRecord {
    public constructor(private request: APIRequestContext) {}

    public async addIncome(data: {
        Income: string | number;
        Date: string;
        Comment: string;
        Currency: string;
        Cash: boolean;
    }): Promise<APIResponse> {
        return await this.request.post('incomes/add', { data });
    }

    public async getAllIncomes(): Promise<APIResponse> {
        return await this.request.get('incomes');
    }

    public async updateIncome(data: {
        ID: string;
        Income: string | number;
        Date: string;
        Comment: string;
        Currency: string;
        Cash: boolean;
    }): Promise<APIResponse> {
        return await this.request.post('incomes/update', { data });
    }

    public async deleteIncome(data: {
        ID: string;
        Income?: string | number;
        Date?: string;
        Comment?: string;
        Currency?: string;
        Cash: boolean;
    }): Promise<APIResponse> {
        return await this.request.post('incomes/delete', { data });
    }
}
