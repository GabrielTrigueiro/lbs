import { TextField } from '@mui/material';
import React from 'react';
import CurrencyInput from 'react-currency-input-field';

interface ICurrencyTextFieldProps {
  label: string;
  stateFunction: (value: React.SetStateAction<string>) => void;
  amount: string;
}

const CurrencyTextField = ({
  amount,
  stateFunction,
  label,
}: ICurrencyTextFieldProps) => {
  const handleAmountChange = (value: any) => {
    stateFunction(value);
  };

  return (
    <TextField
      autoComplete="off"
      label={label}
      variant="outlined"
      InputProps={{
        inputComponent: CurrencyInput as any,
        inputProps: {
          prefix: 'R$ ',
          decimalSeparator: ',',
          groupSeparator: '.',
          allowNegativeValue: false,
          decimalScale: 2,
          onValueChange: handleAmountChange,
        },
        value: amount,
      }}
    />
  );
};

export default CurrencyTextField;
