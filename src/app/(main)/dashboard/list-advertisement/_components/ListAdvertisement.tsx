/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/Loader";
import {
  useDeleteAdvertisementMutation,
  useGetAllAdvertisementQuery,
} from "@/redux/dailynews/advertisement.api";
import ActionDropdown from "@/utils/Action/ActionDropdown";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ListAdvertisement = () => {
  const router = useRouter();

  // API call
  const { data, isLoading, isError } = useGetAllAdvertisementQuery({});
  const [deleteAdvertisement] = useDeleteAdvertisementMutation();

  if (isLoading) {
    return <Loader/>;
  }

  // console.log("News data fetched successfully", data);

  const newsData =
    data?.advertisements?.map((item: any) => ({
      id: item._id,
      advertisementImage: item.advertisementImage || "N/A",
      scheduleAdvertisements: item.scheduleAdvertisements || "N/A",
      advertisementLink: item.advertisementLink || "N/A",
      displayLocation: item.displayLocation || "N/A",
      adminName: item.adminName || "N/A",
    })) || [];

  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-advertisement/update-details/${rowData.id}`);
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
          await deleteAdvertisement(id).unwrap();
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        }
      });
    } catch (err: any) {
      console.error("Error deleting news:", err);
      toast.error(err.message || "Failed to delete news.");
    }
  };

  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-news/view-details/${rowData.id}`);
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "advertisementImage",
      header: () => <span className="font-bold">Image</span>,
      cell: ({ row }) => {
        const imageUrl = row.getValue("advertisementImage") as string;
        return imageUrl && imageUrl !== "N/A" ? (
          <div className="w-20 h-20 relative">
            <Image
              src={imageUrl}
              alt="Advertisement Image"
              fill
              className="object-cover rounded"
            />
          </div>
        ) : (
          <span>No Image</span>
        );
      },
    },
    // {
    //   accessorKey: "advertisementImage",
    //   header: () => <span className="font-bold">Image</span>,
    // },
    {
      accessorKey: "advertisementLink",
      header: () => <span className="font-bold">Ad. Link</span>,
    },
    {
      accessorKey: "displayLocation",
      header: () => <span className="font-bold">Ad. Location</span>,
    },
    {
      accessorKey: "scheduleAdvertisements",
      header: () => <span className="font-bold">Ad. Schedule</span>,
    },
    {
      accessorKey: "adminName",
      header: () => <span className="font-bold">Admin Name</span>,
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
    <div className="overflow-x-auto bg-white p-2">
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
  );
};

export default ListAdvertisement;
