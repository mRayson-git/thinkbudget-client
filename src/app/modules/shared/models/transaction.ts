export interface Transaction {
    userEmail: string;
    accountName: string;
    date: string;
    amount: string;
    payee: string;
    type: string;
    description?: string;
    note?: string;
    category?: string;
    _id?: string;
}
