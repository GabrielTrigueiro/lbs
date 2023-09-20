import { AxiosError } from 'axios';
import { environment } from '../../../environment';
import { api } from '../axios';
import {
  IClientPackage,
  IClientSearch,
  ISendPagination,
  RegisterClient,
} from '../../../models/client';
import { Notification } from '../../../components';

const getAll = async (dados: ISendPagination): Promise<any | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .post<IClientSearch>(environment.url_Client_search, dados, token)
    .then((data) => {
      if (data instanceof AxiosError) {
        return data;
      }
      return data.data.data;
    })
    .catch((err) => {
      console.log('aqui');
      console.error(err);
    });
};

const getByIDd = async (id: string): Promise<any | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .get(environment.url_client + `/${id}`, token)
    .then((data) => {
      if (data instanceof AxiosError) {
        return data.response?.data;
      }
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const UpdateById = async (
  id: string,
  dados: RegisterClient
): Promise<void | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .put<RegisterClient>(environment.url_client + `/${id}`, dados, token)
    .then((data) => {
      if (data instanceof AxiosError) {
        return data.response?.data;
      }
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const DeleteById = async (id: string): Promise<void | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .delete(environment.url_client + `/${id}`, token)
    .then((data) => {
      if (data instanceof AxiosError) {
        return data.response?.data;
      }
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const Create = async (dados: RegisterClient): Promise<any | Error> => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem('Acess_Token')
        ?.replace(/"/g, '')}`,
    },
  };
  return await api
    .post<IClientPackage>(environment.url_client, dados, token)
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

export const ClienteService = {
  getAll,
  getByIDd,
  UpdateById,
  DeleteById,
  Create,
};
