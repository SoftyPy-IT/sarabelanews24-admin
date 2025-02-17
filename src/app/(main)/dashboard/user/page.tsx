/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import TopBar from "./_components/TopBar";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "@/redux/dailynews/users.api";
import toast from "react-hot-toast";


const Page = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllUserQuery({});
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // console.log("News data fetched successfully", data);

  
  const usersData =
    data?.map((item: any) => ({
      id: item._id,
      name: item.name || "N/A",
      email: item.email || "N/A",
      role: item.role || "N/A",
      status: item.status || "N/A",  
    })) || []; 


  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-news/update-details/${rowData.id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
        const res=   await deleteUser(id).unwrap();
         if(res.successfully){
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
         }
        }
      });
    } catch (err: any) {
      console.error("Error deleting news:", err);
      toast.error(err.message || "Failed to delete news.");
    }
  };

  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-video-gallery/view-details/${rowData?.id}`);
  };

  //the columns :
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Roles",
    },
    {
      accessorKey: "status",
      header: "Status",
    },

    {
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }: any) => (
        <Trash2 onClick={() => handleDelete(row.original.id)} />
      ),
    },
  ];

  return (
    <>
      <TopBar />
      <div className="p-4 overflow-x-auto bg-white">
        <DataTable
          columns={columns}
          data={usersData ?? []}
          filterKey="name"
          filterPlaceholder="Search by Name"
          pageSize={10}
        />
      </div>
    </>
  );
};

export default Page;
