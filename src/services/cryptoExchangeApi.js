import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangeApiHeaders = {
  "X-RapidAPI-Key": "4e46caff70msh5513230aad3a98dp16e1dfjsn64318a994ae2",
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
};

const baseUrl = "https://coingecko.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoExchangeApiHeaders,
});

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetCryptoExchangesQuery } = cryptoExchangesApi;
