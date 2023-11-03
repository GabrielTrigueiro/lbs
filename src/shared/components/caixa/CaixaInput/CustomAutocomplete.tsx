import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ISendPagination } from 'shared/models/client';

interface IProps<T> {
  fetchOptions: (conf: ISendPagination) => Promise<any[]>;
  onUpdateValue: (value: T | undefined) => void;
  label: string;
  placeholder: string;
  size?: 'small' | 'medium';
  initialValue?: T;
}

function GenericAutocomplete<T>({
  fetchOptions,
  onUpdateValue,
  label,
  placeholder,
  size,
  initialValue,
}: IProps<T>) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<any[]>([]);

  let PaginationConf: ISendPagination = {
    page: 0,
    pageSize: 5,
    param: 'name',
    sortDirection: 'DESC',
    sortField: 'name',
    value: inputValue,
  };

  const loadOptions = async () => {
    try {
      const data: any = await fetchOptions(PaginationConf);
      setOptions(data.data);
    } catch (error) {
      console.error('Erro na busca de opções:', error);
    }
  };

  return (
    <Autocomplete
      defaultValue={initialValue}
      fullWidth
      size={size}
      options={options}
      getOptionLabel={(option) => (option.name ? option.name : option.type)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => {
        onUpdateValue(newValue || null);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={loadOptions}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}

export default GenericAutocomplete;
