import { Select } from '@chakra-ui/react'

export function CustomSelect({ register, name, children, ...rest }: any) {
  return <Select {...rest}>{children}</Select>
}
