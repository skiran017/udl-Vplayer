import { Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface NavButtonProps {
  href?: string
  children: ReactNode
  onClick: () => void
}

function CustomNavButton({ onClick, children, ...props }: NavButtonProps) {
  return (
    <Button
      as={'a'}
      onClick={onClick}
      w="full"
      justifyContent="space-evenly"
      alignItems="center"
      variant="ghost"
      borderRadius="12px"
      _hover={{
        cursor: 'pointer',
        background: 'whitesmoke'
      }}
      _active={{
        background: '#F0F0F1',
        transform: 'translateY(2px)'
      }}
      mb="1rem"
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomNavButton
