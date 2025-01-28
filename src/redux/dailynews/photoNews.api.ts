import { baseApi } from "../api/baseApi";

const photoNewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPhotoNews: builder.mutation({
      query: (data) => ({
        url: "/photonews",
        method: "POST",
        data,
      }),
      invalidatesTags: ["photoNews"],
    }),

    deletePhotoNews: builder.mutation({
      query: (id) => ({
        url: `/photonews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["photoNews"],
    }),
    getAllPhotoNews: builder.query({
      query: () => ({
        url: "/photonews",
        method: "GET",
    
      }),
      providesTags: ["photoNews"],
    }),
    getSinglePhotoNews: builder.query({
      query: (id) => ({
        url: `/photonews/${id}`,
        method: "GET",
      }),
      providesTags: ["photoNews"],
    }),
    updatePhotoNews: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/photonews/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["photoNews"],
    }),
  }),
});

export const {
  useCreatePhotoNewsMutation, 
  useDeletePhotoNewsMutation, 
  useGetAllPhotoNewsQuery,
  useGetSinglePhotoNewsQuery,
  useUpdatePhotoNewsMutation
} = photoNewsApi;
