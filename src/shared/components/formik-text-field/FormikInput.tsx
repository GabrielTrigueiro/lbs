import { FC } from 'react';
import { FieldProps } from 'formik';
import {TextField, TextFieldProps} from "@mui/material";

type CustomInputProps = FieldProps & TextFieldProps;

const FormikInput: FC<CustomInputProps> = ({
    placeholder,
    label,
    field,
    form,
    ...props
  }) => {

  const { name } = field;
  const { touched, errors, setFieldValue } = form;
  const error = touched[name] && Boolean(errors[name]);

  return (
    <TextField
      fullWidth
      variant="standard"
      margin="normal"
      label={label}
      placeholder={placeholder}
      error={error}
      helperText={touched[name] && errors[name]}
      value={field.value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(name, event.target.value);
      }}
      {...props}
    />
  );
};

export default FormikInput;
