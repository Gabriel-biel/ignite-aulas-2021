import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global"
import Modal from 'react-modal'
import { useState } from "react";

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewModalTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewModalTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewModalTransactionModalOpen(false);
  }
  
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <Modal 
          isOpen={isNewTransactionModalOpen} 
          onRequestClose={handleCloseNewTransactionModal}>
          <h2>Cadastrar Transação</h2>
        </Modal>
      <GlobalStyle />
    </>
  );
}
