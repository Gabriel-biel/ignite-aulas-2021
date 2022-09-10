import Modal from "react-modal";
import incomeImg from '../../assets/Entradas.svg'
import outcomeImg from '../../assets/Saidas.svg'
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from '../../assets/Close.svg'
import { FormEvent, useState } from "react";
import { api } from "../../services/api";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps) {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit');

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    const data = {
      title,
      value,
      type,
      category
    }
    
    api.post('/transactions', data)
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button 
        type='button' 
        onClick={onRequestClose} 
        className='react-modal-close'
      >
        <img src={closeImg} alt="fecharModal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input 
          type="titulo"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)} 
        />
        <input 
          type="string"
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox 
            type='button'
            onClick={() => {setType('deposit')}}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeImg} alt="incomeImg" />
            <span>Entradas</span>
          </RadioBox>
          <RadioBox 
            type='button'
            onClick={() => {setType('withdraw')}}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeImg} alt="outcomeImg" />
            <span>Saídas</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}  
        />
          <button type="submit">Cadastrar</button>
      </Container>
  </Modal>
  )
}