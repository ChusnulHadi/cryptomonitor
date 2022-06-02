
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import millify from "millify";

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '37101e089fmsh715ea9cc69a451cp18be0cjsn864f1f3e20af'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/';

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