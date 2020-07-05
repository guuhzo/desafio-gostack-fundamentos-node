import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error('the transaction value is greater than the income');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('the transaction type is not available');
    }

    const transaction = new Transaction({ title, value, type });

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
