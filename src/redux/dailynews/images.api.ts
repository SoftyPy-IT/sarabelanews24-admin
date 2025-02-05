import { TQueryParam, TResponseRedux } from "@/types/api.types";
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
          url: "/gallery/delete",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["images"],
    }),

    // getAllImages: builder.query({
    //   query: () => ({
    //     url: "/gallery/all",
    //     method: "GET",
    //   }),
    //   providesTags: ["images"],
    // }),

    getAllImages: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/gallery/all",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response,
          meta: response,
        };
      },
      providesTags: ["images"],
    }),


    getImagesByFolder: builder.query({
      query: (id) => ({
        url: `/gallery/folder/${id}`,
        method: "GET",
      }),
      providesTags: ["images"],
    }),

    

    getSingleImages: builder.query({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "GET",
      }),
      providesTags: ["images"],
    }),
    updateImages: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/gallery/${id}`,
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
  useGetImagesByFolderQuery
} = imagesApi;