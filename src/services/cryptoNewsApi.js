import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "4e46caff70msh5513230aad3a98dp16e1dfjsn64318a994ae2",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoNewsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategories, count }) =>
        createRequest(
          `/news/search?q=${newsCategories}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
