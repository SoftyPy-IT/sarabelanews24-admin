import { baseApi } from "../api/baseApi";

const imagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createImages: builder.mutation({
      query: (formData) => ({
        url: "/gallery/upload",
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["images"],
    }),
    deleteImages: builder.mutation({
      query: (data: { id: string; public_id: string }) => {
        console.log("Sending delete request with data:", data);
        return {
          url: `/gallery/delete`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),

    getAllImages: builder.query({
      query: () => ({
        url: "/gallery/all",
        method: "GET",
      }),
      providesTags: ["images"],
    }),
    getSingleImages: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
      }),
      providesTags: ["images"],
    }),
    updateImages: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["images"],
    }),
  }),
});

export const {
  useCreateImagesMutation,
  useDeleteImagesMutation,
  useGetAllImagesQuery,
  useGetSingleImagesQuery,
  useUpdateImagesMutation,
} = imagesApi;
