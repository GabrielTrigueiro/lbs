export const URL = 'https://api.lbs.bitbeelabs.tech';

export const environment = {
  //url base
  url_back: URL,

  //autenticação
  url_login: URL + `/login`,

  //cliente
  url_Client_search: URL + `/api/client/search/`,
  url_client: URL + `/api/client`,

  //fornecedor
  url_provider_search: URL + `/api/provider/search/`,
  url_provider: URL + `/api/provider`,

  //indicações
  url_create_indication: URL + `/api/indicacao`,
  url_indication: URL + `/api/indicacao/`,
  url_Indicacao_search: URL + `/api/indicacao/search`,

  //categorias
  url_category: URL + '/api/category',
  url_cateogires_search: URL + '/api/category/search/',

  //produtos
  url_product: URL + '/api/product',
  url_product_search: URL + '/api/product/search/',

  //caixa
  url_sale: URL + '/api/venda',

  url_colab: URL + '/collaborator',

  url_payment: URL + '/api/typePayment',
};
