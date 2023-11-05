import { Button } from '@chakra-ui/react'

interface ButtonProps {
  btnType?: 'submit' | 'reset' | 'button' | undefined
  title?: string
  handleClick?: () => void
  leftIcon?: any
}

function CustomButton({ btnType, title, handleClick, ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      fontWeight={'semibold'}
      fontSize="16px"
      px={4}
      rounded="18px"
      _active={{
        transform: 'scale(0.98)'
      }}
      border="1px solid #11999e"
      type={btnType}
      onClick={handleClick}
      {...props}
    >
      {title}
    </Button>
  )
}

export default CustomButton
