/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDeleteNewsMutation, useGetAllNewsQuery } from "@/redux/dailynews/news.api";
import ActionDropdown from "@/utils/Action/ActionDropdown";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "@/app/loading";
import { useDeletePhotoNewsMutation, useGetAllPhotoNewsQuery } from "@/redux/dailynews/photoNews.api";

const ImagesDataTable = () => {
  const router = useRouter();


  // API call
  const { data, isLoading, isError } = useGetAllPhotoNewsQuery({});
  const [deletePhotoNews] = useDeletePhotoNewsMutation();

  if (isLoading) {
    return <Loading/>;
  }

  // console.log("News data fetched successfully", data);

  // Map data to match the columns
  // Ensure `newsData` is always an array
  const newsData =
    data?.photonews?.map((item: any, index: any) => ({
      id: item._id,
      slNo:index + 1,
      title: item.title || "N/A",
      description: item.description || "N/A",
      imgTagline: item.imgTagline || "N/A",
      adminName: item.adminName || "N/A",      
      postDate: new Date(item.postDate).toLocaleDateString(),
    
    })) || []; 

  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-photo-news/update-details/${rowData.id}`);
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
          await deletePhotoNews(id).unwrap();
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        }
      });
    } catch (err: any) {
      console.error("Error deleting news:", err);
      toast.error(err.message || "Failed to delete news.");
    }
  };
  

  // const handleDelete = async (id: string) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //           await deleteNews(id).unwrap();

  //           Swal.fire({
  //               title: "Deleted!",
  //               text: "Your activity has been deleted.",
  //               icon: "success"
  //           });
  //       } catch (err: any) {
  //           toast.error(err.message);
  //       }
  //   }

  //     if (result.isConfirmed) {
  //       Swal.fire("Deleted!", "Delete Successful", "success");
  //       console.log("Deleting row:", id);
  //     }
  //   });
  // };

  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-news/view-details/${rowData.id}`);
  };

  const columns: ColumnDef<any, any>[] = [
    
    {
      accessorKey: "slNo",
      header: () => <span className="font-bold">SL. No.</span>,
    },
    {
      accessorKey: "adminName",
      header: () => <span className="font-bold">Admin Name</span>,
    },
    {
      accessorKey: "title",
      header: () => <span className="font-bold">Title</span>,
    },
    {
      accessorKey: "description",
      header: () => <span className="font-bold">Description</span>,
    }, 
    {
      accessorKey: "imgTagline",
      header: () => <span className="font-bold">Image Tag Line</span>,
    },

    {
      accessorKey: "postDate",
      header: () => <span className="font-bold">Post Date</span>,
    },      
       
    {
      accessorKey: "Action",
      header: () => <span className="font-bold">Action</span>,
      cell: ({ row }: any) => (
        <ActionDropdown
          row={row}
          onView={handleView}
          onUpdate={handleEdit}
          onDelete={() => handleDelete(row.original.id)}
        />
      ),
    },
  ];

  return (
    <>
   
    <div className="overflow-x-auto bg-white p-2 rounded">
      
      <DataTable
        columns={columns}
        data={newsData ?? []} 
        filterKey="adminName"
        filterPlaceholder="Search by Admin Name"
        pageSize={10}
        selectOptions={{
          key: "newsType",
          options: [
            { label: "Politics", value: "Politics" },
            { label: "Economy", value: "Economy" },
            { label: "Sports", value: "Sports" },
            { label: "Entertainment", value: "Entertainment" },
            { label: "Education", value: "Education" },
          ],
          placeholder: "Select News Type",
        }}
      />
    </div>
    </>
  );
};

export default ImagesDataTable;



