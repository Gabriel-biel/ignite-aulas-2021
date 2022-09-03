import { Container } from "./styles";
import Entradas from '../../assets/Entradas.svg'
import Saidas from '../../assets/Saidas.svg'
import Total from '../../assets/Total.svg'

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Entradas} alt="Entradas" />
        </header>
        <strong>R$1.000,00</strong>
      </div>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Saidas} alt="Saídas" />
        </header>
        <strong>-R$500,00</strong>
      </div>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Total} alt="Total" />
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  );
}