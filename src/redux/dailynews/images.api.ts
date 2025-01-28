import { baseApi } from "../api/baseApi";

const imagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createImages: builder.mutation({
    //   query: (data) => ({
    //     url: "/gallery/upload",
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: ["images"],
    // }),


    createImages: builder.mutation({
      query: (formData) => ({
        url: '/gallery/upload',
        method: 'POST',
        data: formData,
        contentType: 'multipart/form-data', // Set content type for files
      }),
      invalidatesTags: ['images'],
    }),

    deleteImages: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["images"],
    }),
    getAllImages: builder.query({
      query: () => ({
        url: "/news",
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
  useUpdateImagesMutation
} = imagesApi;
