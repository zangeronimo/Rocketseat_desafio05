import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    const incomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    if (incomes.length > 0) {
      income = incomes.reduce((item, total) => item + total);
    }

    const outcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    if (outcomes.length > 0) {
      outcome = outcomes.reduce((item, total) => item + total);
    }

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
