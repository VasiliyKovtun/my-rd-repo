import { APIRequestContext } from '@playwright/test';
import { IncomeRecord } from '../../src/api/incomes.record';

export class DeleteIncomesPrecondition {
    private incomesRecord: IncomeRecord;

    public constructor(private request: APIRequestContext) {
        this.incomesRecord = new IncomeRecord(request);
    }

    public async deleteAllIncomes(): Promise<void> {
        const response = await this.incomesRecord.getAllIncomes();
        const responseData = await response.json();

        const incomes = Array.isArray(responseData)
            ? responseData
            : (responseData.data || responseData.items || []);

        if (incomes.length === 0) {
            console.log('No incomes found to delete.');
            return;
        }

        for (const income of incomes) {
            const incomeId = income.ID || income.id;

            if (incomeId === undefined) {
                console.error('Received income object without ID:', income);
                continue;
            }

            const deleteResponse = await this.incomesRecord.deleteIncome({
                ID: incomeId,
                Cash: true
            });

            if (deleteResponse.status() !== 200) {
                throw new Error(
                    `Failed to delete income with ID ${incomeId}. Status: ${deleteResponse.status()}, Body: ${await deleteResponse.text()}`
                );
            }
        }
        console.log(`Successfully deleted ${incomes.length} incomes.`);
    }
}
