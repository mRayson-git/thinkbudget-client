export interface Budget {
    userEmail: string;
    budgetCategories?: { categoryName: string, amount: number, colour: string }[];
}
