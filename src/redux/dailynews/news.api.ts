/* eslint-disable @typescript-eslint/no-unused-vars */
import { TQueryParam, TResponseRedux } from "@/types/api.types";
import { baseApi } from "../api/baseApi";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNews: builder.mutation({
      query: (data) => ({
        url: "/news",
        method: "POST",
        data,
      }),
      invalidatesTags: ["news"],
    }),

    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["news"],
    }),
    getAllNews: builder.query({
      query: () => ({
        url: "/news",
        method: "GET",
      }),
      providesTags: ["news"],
    }),
    // getAllNews: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     // If there are any query parameters, add them to the URL search params
    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }

    //     return {
    //       url: "/news", // Endpoint URL for news
    //       method: "GET",
    //       params: params, // Passing URLSearchParams as query parameters
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    //   providesTags: ["news"], // Tagging the query to invalidate/update news data if needed
    // }),

    getSingleNews: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
      }),
      providesTags: ["news"],
    }),
    updateNews: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["news"],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useUpdateNewsMutation,
} = newsApi;
