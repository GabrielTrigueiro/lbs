import { AxiosError } from 'axios';
import { api } from '../axios';
import { environment } from 'shared/environment';

const getFormasDePagamento = async (): Promise<any | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .get(environment.url_payment, token)
    .then((data) => {
      if (data instanceof AxiosError) {
        return data;
      }
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const PaymentService = {
  getFormasDePagamento,
};
