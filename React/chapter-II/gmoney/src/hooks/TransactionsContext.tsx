import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface ITransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransaction[],
  createTransaction: (transaction: ITransactionInput) => Promise<void>
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
  );


export function TransactionsProvider({children}: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: ITransactionInput) {
    
    const response = await api.post('/transactions', {...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

