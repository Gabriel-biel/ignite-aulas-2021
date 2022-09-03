import Logo from '../../assets/Logo.svg'
import { Container, Content } from './styles'

export function Header() {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="Gmoney" />
        <button type="button">Nova Transação</button>
      </Content>
    </Container>
  )
}