import { AxiosError } from 'axios';
import { api } from '../axios';
import { environment } from 'shared/environment';

const getColaboradores = async (): Promise<any | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .get(environment.url_colab, token)
    .then((data) => {
      if (data instanceof AxiosError) {
        return data;
      }
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const CollaboratorService = {
  getColaboradores,
};
