import { useEffect, useState } from "react";
import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  InputGroup, 
  Input, 
  InputLeftElement, 
  NumberIncrementStepper, 
  NumberDecrementStepper, 
  NumberInputStepper, 
  NumberInput, 
  NumberInputField, 
  Heading, 
  Stack 
} from "@chakra-ui/react";
import moment from 'moment';

export default function SalaryCalculator() {
  const [isActive, setIsActive] = useState(false);
  const [salary, setSalary] = useState(0);
  const [salaryPerSecond, setSalaryPerSecond] = useState(0);
  const [curSalary, setCurSalary] = useState(0);
  const [timeOfPageVisit, setTimeOfPageVisit] = useState(moment(new Date()));
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimeElapsed(timeOfPageVisit.fromNow());
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setCurSalary(curSalary + salaryPerSecond);
      }, 1000);
    } else if (!isActive && curSalary !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, curSalary, salary, salaryPerSecond]);

  const formatSalary = (salaryAmount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(salaryAmount);
  const handleHoursPerWeekChange = (value) => setHoursPerWeek(parseInt(value))

  const calculate = (e) => {
    e.preventDefault();
    setCurSalary(0);
    setIsActive(true);
    let curSalaryPerSecond = salary / (hoursPerWeek * 52) / 60 / 60;
    setSalaryPerSecond(curSalaryPerSecond); 
  }

  return (
    <Flex direction="column" justify="space-evenly" align="center" h="100%" w="100%">
      <Stack>
        <Heading>Time Since Page Visit: {timeElapsed}</Heading>
        <Heading>Gross Salary: {formatSalary(salary)}</Heading>
        <Heading>Amount Earned Since Page Visit: {formatSalary(curSalary)}</Heading>
      </Stack>
      <Flex>
        <FormControl id="salary-form">
          <FormLabel>Gross Salary</FormLabel>
          <InputGroup w="100%">
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input placeholder="Enter your gross salary" variant="flushed" mb="8" onChange={(e) => setSalary(parseInt(e.target.value))} />
          </InputGroup>
          <FormLabel>Hours Per Week</FormLabel>
          <NumberInput value={hoursPerWeek} onChange={handleHoursPerWeekChange} min={0} max={168} w="100%">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button size="md" colorScheme="pink" type="submit" w="100%" mt="10" onClick={e => salary && calculate(e)}>Calculate</Button>
        </FormControl>
      </Flex>
    </Flex>
  )
}