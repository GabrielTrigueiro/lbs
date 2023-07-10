import * as yup from 'yup';

const loginValidationSchema = yup.object({
  username: yup
    .string()
    .required('Digite o usuário.'),
  password: yup
    .string()
    .min(4, 'Senha deve ter ao menos 4 digitos.')
    .required('Digite a senha.'),
});

export default loginValidationSchema;