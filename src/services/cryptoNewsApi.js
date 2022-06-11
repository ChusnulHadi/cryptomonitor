// import fetching function dari @reduxjs/toolkit
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//set api header
const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_NEWS_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_NEWS_API_KEY
}

//set base url
const baseUrl = process.env.REACT_APP_CRYPTO_NEWS_URL;

//prototyping createRequest function from header and url
const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        //get crypto news by newsCategory, and limit
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(`./news/search?q=${newsCategory}&freshness=Day&safeSearch=Off&textFormat=Raw&count=${count}&offset=0`),
        })
    })
});

//export menggunakan destructuring objects dari cryptoNewsApi
export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi; 