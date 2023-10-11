import { IDadosDaCompra } from 'shared/models/caixa';
import { api } from '../axios';
import { environment } from 'shared/environment';
import { AxiosError } from 'axios';
import { Notification } from 'shared/components';

interface IErroDaApi {
  field: string;
  message: string;
}

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
      Notification(data.data.message, 'success');
      return data.data;
    })
    .catch((err) => {
      err.response.data.errors.forEach((element: IErroDaApi) => {
        Notification(element.message, 'error');
      });
      console.log(err.response.data.errors);
    });
};

export const CaixaService = {
  submitCompra,
};
