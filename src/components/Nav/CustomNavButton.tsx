import { Flex, Button, Text } from '@chakra-ui/react'
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
        // transform: 'translateY(-1px)',
        // boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 6px'
      }}
      _active={{
        background: '#F0F0F1',
        transform: 'translateY(2px)'
        // boxShadow: 'rgba(0, 0, 0, 0.06) 0 2px 4px'
      }}
      {...props}
      mb="1rem"
    >
      {children}
    </Button>
  )
}

export default CustomNavButton
