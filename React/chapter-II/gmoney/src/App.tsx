import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global"
import Modal from 'react-modal'
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/TransactionsContext";

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
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal} />
        
      <GlobalStyle />
    </TransactionsProvider>
  );
}
