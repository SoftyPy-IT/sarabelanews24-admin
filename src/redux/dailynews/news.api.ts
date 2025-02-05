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
  useUpdateNewsMutation
} = newsApi;
