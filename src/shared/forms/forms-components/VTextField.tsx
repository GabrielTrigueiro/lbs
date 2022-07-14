import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TVTextField = TextFieldProps & {
    name: string
}

export const VTextField: React.FC<TVTextField> = ({name, ...rest}) => {

    const {clearError, defaultValue, error, fieldName, registerField} = useField(name)

    const [value, setValue] = useState<string>(defaultValue || '')

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue) ,
        })
    } , [registerField, fieldName, value])

    return(
        <TextField
            {...rest}
            autoComplete="off"

            variant="standard"
            
            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            onKeyDown={()=> error? clearError() : undefined}

            value={value}
            onChange={e => setValue(e.target.value)}
        />
  )
};
