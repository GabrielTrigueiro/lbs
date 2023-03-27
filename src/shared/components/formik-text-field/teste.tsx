import {TextField} from '@mui/material';
import { useFormikContext } from 'formik';
import { IDataProduct } from '../../models/product';


interface props {
    label: string;
}
const FormikTextFieldTeste: React.FC<props> = ({label}) => {
    const formik = useFormikContext<IDataProduct>();
    return (
        <TextField
            autoComplete="off"
            variant="standard"
            size="small"
            fullWidth
            id={label}
            name={label}
            label="Nome completo"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
        />
    )
}

export default FormikTextFieldTeste;