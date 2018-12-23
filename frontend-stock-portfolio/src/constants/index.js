export const backendBaseURL = 'https://ttp-stocks-node.herokuapp.com/';

export const stocksBaseURL = 'https://api.iextrading.com/1.0/';

export const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export function authorizedHeaders() {
    return { ...HEADERS, Authorization: `Bearer ${localStorage.getItem("spra-token")}`}
};