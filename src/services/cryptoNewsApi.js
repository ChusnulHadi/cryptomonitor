
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_NEWS_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_NEWS_API_KEY
}

const baseUrl = process.env.REACT_APP_CRYPTO_NEWS_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(`./news/search?q=${newsCategory}&freshness=Day&safeSearch=Off&textFormat=Raw&count=${count}&offset=0`),
        })
    })
});

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi; 