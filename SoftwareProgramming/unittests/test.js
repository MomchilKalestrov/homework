//@ts-check
import assert from 'node:assert';
import { factorial, BankAccount } from './dist/main.js';

const bankAccount = new BankAccount('Peter Mark', 500);

/** @type { (() => void)[] } */
const tests = [
    () => {
        assert.strictEqual(factorial(3), 6);
    },
    () => {
        bankAccount.debit(250);
        assert.strictEqual(bankAccount.balance, 250);
    },
    () => {
        assert.throws(() => bankAccount.debit(-3));
    },
    () => {
        assert.throws(() => bankAccount.debit(300));
    },
    () => {
        assert.throws(() => bankAccount.credit(-3));
    },
    () => {
        bankAccount.credit(250);
        assert.strictEqual(bankAccount.balance, 500);
    },
];

/** @type { number } */
let passedCount = 0;

for (const i in tests)
    try {
        tests[ i ]();
        console.log(`\x1b[32m✔ Test ${ Number(i) + 1 } passed.\x1b[0m`);
        passedCount++;
    } catch {
        console.log(`\x1b[31m✘ Test ${ Number(i) + 1 } failed.\x1b[0m`);
    };

console.log(`${ passedCount } out of ${ tests.length } passed.`);
