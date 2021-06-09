import { Container } from '../components/Container'
import SalaryCalculator, { Main } from '../components/SalaryCalculator'
import { DarkModeSwitch } from '../components/DarkModeSwitch'

const Index = () => (
  <Container height="100vh">
    <SalaryCalculator />
    <DarkModeSwitch />
  </Container>
)

export default Index
