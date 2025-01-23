import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        data,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
    
      }),
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation, 
  useDeleteUserMutation, 
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation
} = usersApi;
