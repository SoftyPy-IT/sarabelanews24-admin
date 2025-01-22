import { baseApi } from "../api/baseApi";

const advertisementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createAdvertisement: builder.mutation({
      query: (data) => ({
        url: "/advertisement",
        method: "POST",
        data,
      }),
      invalidatesTags: ["advertisement"],
    }),

    deleteAdvertisement: builder.mutation({
      query: (id) => ({
        url: `/advertisement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["advertisement"],
    }),

    getAllAdvertisement: builder.query({
      query: () => ({
        url: "/advertisement",
        method: "GET",
    
      }),
      providesTags: ["advertisement"],
    }),

    getSingleAdvertisement: builder.query({
      query: (id) => ({
        url: `/advertisement/${id}`,
        method: "GET",
      }),
      providesTags: ["advertisement"],
    }),

    updateAdvertisement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/advertisement/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["advertisement"],
    }),

  }),
});

export const {
  useCreateAdvertisementMutation,
  useDeleteAdvertisementMutation,
  useGetAllAdvertisementQuery,
  useGetSingleAdvertisementQuery,
  useUpdateAdvertisementMutation,
} = advertisementApi;
