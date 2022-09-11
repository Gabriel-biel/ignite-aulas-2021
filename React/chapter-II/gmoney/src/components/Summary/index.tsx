import { Container } from "./styles";
import Entradas from '../../assets/Entradas.svg'
import Saidas from '../../assets/Saidas.svg'
import Total from '../../assets/Total.svg'
import { useTransactions } from "../../hooks/TransactionsContext";

export function Summary() {
  const {transactions} = useTransactions();

  const sumary = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } 
      else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
      {
        deposits: 0,
        withdraws: 0,
        total: 0
      }
  )


  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Entradas} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(sumary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={Saidas} alt="Saídas" />
        </header>
        <strong>
          -
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(sumary.withdraws)}
        </strong>
      </div>
      <div className='highlihgt-background'>
        <header>
          <p>Total</p>
          <img src={Total} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(sumary.total)}
        </strong>
      </div>
    </Container>
  );
}