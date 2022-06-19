import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";

type TVTextField = TextFieldProps & {
    name: string
}

export const VTextField: React.FC<TVTextField> = ({name, ...rest}) => {

    const {clearError, defaultValue, error, fieldName, registerField} = useField(name)

    return(
        <TextField
            {...rest}
        />
  )
};
