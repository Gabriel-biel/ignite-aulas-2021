import { Container } from "./styles";

export function TransactionsTable() {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>03/08/2022</td>
          </tr>
          <tr>
            <td>Compras Não Previstas</td>
            <td className="withdraw">-R$1.000</td>
            <td>Desenvolvimento</td>
            <td>03/08/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}