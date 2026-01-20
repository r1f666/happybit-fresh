const API_KEY = 'okU76sovG3P5SP59y6PvzYWroGRbCOnL8H6+mQJgvtQ=';
const API_URL = 'https://openapiv1.coinstats.app/coins';

export const fetchCoinsFromApi = async () => {
    const response = await fetch(API_URL, {
        headers: {
            'X-API-KEY': API_KEY
        }
    });

    const data = await response.json();

    return data;
};




