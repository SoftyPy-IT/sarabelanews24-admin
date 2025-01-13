/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import TopBar from "./_components/TopBar";

const data = [
  {
    id: 1,
    reporterType: "Ibrahim",
    name: "ibrahim@gmail.com",
    newsArea: "Admin",
    reportedDateAndTime: "Active",
  },
  {
    id: 2,
    reporterType: "Bablu",
    name: "bablu@gmail.com",
    newsArea: "Admin",
    reportedDateAndTime: "Active",
  },
  {
    id: 3,
    reporterType: "Liton",
    name: "liton@gmail.com",
    newsArea: "Admin",
    reportedDateAndTime: "Active",
  },
  {
    id: 4,
    reporterType: "Talukder",
    name: "talukder@gmail.com",
    newsArea: "Admin",
    reportedDateAndTime: "Active",
  },
  {
    id: 5,
    reporterType: "Khairul",
    name: "khairul@gmail.com",
    newsArea: "Modaretor",
    reportedDateAndTime: "Active",
  },
];

const Page = () => {
  // const router = useRouter();

  // const handleEdit = (rowData: any) => {
  //   console.log("Editing row:", rowData);
  // };

  // const handleDelete = (rowData: any) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Delete Successful",
  //         icon: "success",
  //       });
  //     }
  //   });
  //   console.log("Deleting row:", rowData);
  // };

  // const handleView = (rowData: any) => {
  //   router.push(`add-tranding-news/view-details/${rowData?.id}`);
  //   console.log("Viewing row:", rowData);
  // };

  //the columns :
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "reporterType",
      header: "Name",
    },
    {
      accessorKey: "name",
      header: "Email",
    },
    {
      accessorKey: "newsArea",
      header: "Roles",
    },
    {
      accessorKey: "reportedDateAndTime",
      header: "Status",
    },

    {
      accessorKey: "Action",
      header: "Action",
      cell: ({}: any) => <Trash2 />,
    },
  ];

  return (
    <>
      <TopBar />
      <div className="p-4 overflow-x-auto bg-white">
        <DataTable
          columns={columns}
          data={data}
          // filterKey="name"
          // filterPlaceholder="Search by Name"
          pageSize={10}
        />
      </div>
    </>
  );
};

export default Page;
