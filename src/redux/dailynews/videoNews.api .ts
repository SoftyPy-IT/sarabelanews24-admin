import { baseApi } from "../api/baseApi";

const videoNewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVideoNews: builder.mutation({
      query: (data) => ({
        url: "/video-news",
        method: "POST",
        data,
      }),
      invalidatesTags: ["videoNews"],
    }),

    deleteVideoNews: builder.mutation({
      query: (id) => ({
        url: `/video-news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videoNews"],
    }),
    getAllVideoNews: builder.query({
      query: () => ({
        url: "/video-news",
        method: "GET",
    
      }),
      providesTags: ["videoNews"],
    }),
    getSingleVideoNews: builder.query({
      query: (id) => ({
        url: `/video-news/${id}`,
        method: "GET",
      }),
      providesTags: ["videoNews"],
    }),
    updateVideoNews: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/video-news/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["videoNews"],
    }),
  }),
});

export const {
  useCreateVideoNewsMutation, 
  useDeleteVideoNewsMutation, 
  useGetAllVideoNewsQuery,
  useGetSingleVideoNewsQuery,
  useUpdateVideoNewsMutation
} = videoNewsApi;
