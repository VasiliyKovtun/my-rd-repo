import { APIRequestContext, APIResponse } from '@playwright/test';

export class ExpensesRecord {
    public constructor(private request: APIRequestContext) {}

    public async addExpense(data: {
        Expense: string | number;
        Date: string;
        Comment: string;
        Currency: string;
        Cash: boolean;
    }): Promise<APIResponse> {
        return await this.request.post('expenses/add', { data });
    }

    public async getAllExpenses(): Promise<APIResponse> {
        return await this.request.get('expenses');
    }

    public async updateExpense(data: {
        ID: string;
        Expense: string | number;
        Date: string;
        Comment: string;
        Currency: string;
        Cash: boolean;
    }): Promise<APIResponse> {
        return await this.request.post('expenses/update', { data });
    }

    public async deleteExpense(data: {
        ID: string;
        Expense?: string | number;
        Date?: string;
        Currency?: string;
        Cash: boolean;
    }): Promise<APIResponse> {
        return await this.request.post('expenses/delete', { data });
    }
}
