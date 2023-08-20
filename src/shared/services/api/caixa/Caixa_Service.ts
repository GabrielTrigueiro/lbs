import { IDadosDaCompra } from 'shared/models/caixa';
import { api } from '../axios';
import { environment } from 'shared/environment';
import { AxiosError } from 'axios';
import { Notification } from 'shared/components';

const submitCompra = async (dados: IDadosDaCompra): Promise<any | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .post(environment.url_sale, dados, token)
    .then((data) => {
      if (data instanceof AxiosError) {
        return data.response?.data;
      }
      return data.data;
    })
    .catch((err) => {
      Notification(`${err.response.data.message}`, 'error');
    });
};

export const CaixaService = {
  submitCompra,
};
