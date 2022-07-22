
export const URL = 'https://api.lbs.bitbeelabs.tech'

export const environment = {

    url_back: URL,
    url_login: URL + `/login`,
    url_Client_search: URL + `/api/client/search/`,
    url_provider_search: URL + `/api/provider/search/`,
    url_client:  URL + `/api/client/`,
    url_provider: URL + `/api/provider/`,
}

export const TokenConfig = {
    headers:{
        Authorization: `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
    }
} 