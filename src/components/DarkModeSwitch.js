import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode, Switch, IconButton } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
  
    <IconButton 
      onClick={toggleColorMode} 
      aria-label="Search database"
      position="fixed"
      top="1rem"
      right="1rem"
      icon={isDark ? <SunIcon /> : <MoonIcon /> } />
  )
}
