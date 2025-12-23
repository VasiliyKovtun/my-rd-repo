export interface ExpenseV2 {
    expense: number | string;
    id: string;
    dt: string; // ISO date
    userID: string;
    comment: string;
    type: string | null;
    currency: string;
    cash: boolean;
    taxPayed: boolean;
}
