import { APIRequestContext } from '@playwright/test';
import { IncomeRecord } from '../../src/api/incomes.record';

export class AddIncomePrecondition {
    private incomeRecord: IncomeRecord;

    public constructor(private request: APIRequestContext) {
        this.incomeRecord = new IncomeRecord(request);
    }

    public async addIncome(data: {
        Income: string | number;
        Date: string;
        Comment: string;
        Currency: string;
        Cash: boolean;
    }): Promise<void> {
        const response = await this.incomeRecord.addIncome(data);

        if (response.status() !== 200) {
            throw new Error(`Failed to add income. Status: ${response.status()}, Body: ${await response.text()}`);
        }
    }

    public async addIncomes(
        incomes: {
            Income: string | number;
            Date: string;
            Comment: string;
            Currency: string;
            Cash: boolean;
        }[]
    ): Promise<void> {
        for (const income of incomes) {
            await this.addIncome(income);
        }
    }
}
