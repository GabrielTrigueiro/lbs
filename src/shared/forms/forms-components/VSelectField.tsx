import React, { useRef, useEffect } from "react";
import ReactSelect, { Props as SelectProps } from "react-select";
import { useField } from "@unform/core";

interface Props extends SelectProps {
  name: string;
}

export const VSelectField: React.FC<Props> = ({ name, ...rest }) => {
  const { fieldName, defaultValue, registerField } = useField(name);

  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => ref.state.value,
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      clearValue: (ref) => {
        ref.select.clearValue();
      }
    });
  }, [fieldName, registerField]);

  return(
    <ReactSelect
      ref={selectRef}
      defaultValue={defaultValue}
      {...rest}
    />
  )
};