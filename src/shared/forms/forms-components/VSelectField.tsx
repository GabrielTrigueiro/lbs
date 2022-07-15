import { useEffect, useState } from 'react'
import { useField } from '@unform/core'
import { FormControl, InputLabel, MenuItem, Select, SelectProps, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface IOption {
  label: string
  value: number
}

interface Props  extends SelectProps {
    name: string
    listOption: IOption[]
}

export const VSelectField: React.FC<Props> = ({listOption ,name, ...rest }) => {
  
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
    <FormControl sx={{display:'flex'}}>
        <InputLabel sx={{fontSize:'12px'}} variant='standard'>Genero</InputLabel>
        <Select 
          size='small'
          value={value}
          defaultValue={defaultValue}
          variant={'standard'}
          onChange={e => setValue(e.target.value as string)}
          {...rest}
        >
          {listOption.map(row => (
            <MenuItem  sx={{fontSize:'12px'}} value={row.label}>{row.label}</MenuItem>
          ))}            
        </Select>
    </FormControl>
  )
}