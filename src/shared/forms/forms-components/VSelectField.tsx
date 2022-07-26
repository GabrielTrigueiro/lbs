import { useEffect, useState } from 'react'
import { useField } from '@unform/core'
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'

interface IOption {
  label: string
  value: number
}

interface Props  extends SelectProps {
    name: string
    listOption: IOption[]
}

export const VSelectField: React.FC<Props> = ({listOption ,name, ...rest }) => {
  
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const [value, setValue] = useState<string>(defaultValue||'')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    })
  }, [fieldName, registerField, value])

  return (
    <FormControl sx={{display:'flex',fontSize:'12px'}}>
        <InputLabel sx={{fontSize:'12px'}} variant='standard'>Genero</InputLabel>
        <Select 
        sx={{fontSize:'12px'}}
          value={value}
          defaultValue={defaultValue}
          variant={'standard'}
          onChange={e => setValue(e.target.value as string)}
          error={!!error}
          {...rest}
        >
          {listOption.map(row => (
            <MenuItem key={row.value}  sx={{fontSize:'12px'}} value={row.label}>{row.label}</MenuItem>
          ))}            
        </Select>
    </FormControl>
  )
}