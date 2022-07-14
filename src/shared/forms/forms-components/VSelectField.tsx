import { useEffect, useState } from 'react'

import { useField } from '@unform/core'
import { FormControl, MenuItem, Select, SelectProps } from '@mui/material'

interface IOptionSelect {
    label: string
    value: number
}

interface Props  extends SelectProps {
    name: string
}

/**
 * Select component for Unform (without React Select)
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
export const VSelectField: React.FC<Props> = ({ name, ...rest }) => {
  
  const { fieldName, registerField, defaultValue } = useField(name)

  const [value, setValue] = useState<string>(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    })
  }, [fieldName, registerField, value])

  return (
    <div>
    <FormControl>
        <Select
            value={value}
            defaultValue={defaultValue}
            onChange={e => setValue(e.target.value as string)}
            {...rest}
        >
            <MenuItem value={'msma'} >msma</MenuItem>
            <MenuItem value={'aaaa'} >aaaa</MenuItem>
            <MenuItem value={'vvvv'} >vvvv</MenuItem>
        </Select>
    </FormControl>
    </div>
  )
}   