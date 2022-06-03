import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    // 'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_API_HOST,
    // 'X-RapidAPI-Key': '37101e089fmsh715ea9cc69a451cp18be0cjsn864f1f3e20af'
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_API_KEY
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`./coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`./coin/${coinId}`)
        })
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
} = cryptoApi;