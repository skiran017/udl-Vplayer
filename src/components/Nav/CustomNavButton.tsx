import { Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface NavButtonProps {
  href: string
  children: ReactNode
}

function CustomNavButton({ href, children, ...props }: NavButtonProps) {
  return (
    <Button
      as={'a'}
      href={href}
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
      {...props}
      mb="1rem"
    >
      {children}
    </Button>
  )
}

export default CustomNavButton
