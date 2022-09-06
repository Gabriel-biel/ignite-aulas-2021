import Modal from "react-modal";
import incomeImg from '../../assets/Entradas.svg'
import outcomeImg from '../../assets/Saidas.svg'
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from '../../assets/Close.svg'
import { useState } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps) {
  const [type, setType] = useState('deposit');

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
      <Container>
        <h2>Cadastrar Transação</h2>
        <input 
          type="number"
          placeholder="Título" 
        />
        <input 
          type="number"
          placeholder="Valor"
        />

        <TransactionTypeContainer>
          <RadioBox 
            type='button'
            onClick={() => {setType('deposit')}}
            isActive={type === 'deposit'}
          >
            <img src={incomeImg} alt="incomeImg" />
            <span>Entradas</span>
          </RadioBox>
          <RadioBox 
            type='button'
            onClick={() => {setType('withdraw')}}
            isActive={type === 'withdraw'}
          >
            <img src={outcomeImg} alt="outcomeImg" />
            <span>Saídas</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria" 
        />
          <button type="submit">Cadastrar</button>
      </Container>
  </Modal>
  )
}