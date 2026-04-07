const factorial = (num: number): number =>
    num <= 1 ? 1 : num * factorial(num - 1);

class BankAccount {
    customerName: string;
    balance: number;

    constructor(customerName: string, balance: number) {
        this.customerName = customerName;
        this.balance = balance;
    }

    debit(amount: number): void {
        if (amount > this.balance)
            throw new Error();

        if (amount < 0)
            throw new Error();

        this.balance -= amount;
    }

    credit(amount: number): void {
        if (amount < 0)
            throw new Error();

        this.balance += amount;
    }
}

export { factorial, BankAccount };