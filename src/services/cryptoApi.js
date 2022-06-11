//import fetching function from @reduxjs/toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//set api header
const cryptoApiHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_API_KEY
}

const baseUrl = process.env.REACT_APP_CRYPTO_URL;

//prototyping createRequest function from header and url
const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        //get all cryptocurrencies
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        //get cryptocurrency details by id
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        //get cryptocurrency news by id
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
});

//export menggunakan destructuring objects dari cryptoApi
export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;