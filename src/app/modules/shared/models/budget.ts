import { Category } from './category';

export interface Budget {
    // ID for who this budget belongs to
    userEmail: string;
    // Categories that are in the budget with values (budgeted amount, colour, etc...)
    budgetCategories?: Category[];
    // List of category names for ease of access
    categories?: string[];
}
