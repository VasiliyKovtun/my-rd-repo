export interface IncomeV2 {
    income: number | string;
    id: string;
    dt: string;
    userID: string;
    comment: string;
    type: string | null;
    currency: string;
    cash: boolean;
    taxPayed: boolean;
}
