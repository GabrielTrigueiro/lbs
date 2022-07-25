import { TextField, OutlinedInputProps, OutlinedInput } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TLoginOutlinedInput = OutlinedInputProps & {
    name: string
}

export const VLoginOutlinedInput: React.FC<TLoginOutlinedInput> = ({name, ...rest}) => {

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
        <OutlinedInput
            {...rest}
            autoComplete="off"

            error={!!error}
            defaultValue={defaultValue}
            onKeyDown={()=> error? clearError() : undefined}

            value={value}
            onChange={e => setValue(e.target.value)}
        />
  )
};
