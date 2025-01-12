"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { FolderOpen, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import AddFolderModal from "./_components/AddFolderModal";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [open, setOpen] = useState(false);

  const folders = [
    { id: 1, name: "Folder 1", images: ["img1.jpg", "img2.jpg"] },
    { id: 2, name: "Folder 2", images: ["img3.jpg", "img4.jpg"] },
    { id: 3, name: "Folder 3", images: ["img5.jpg", "img6.jpg"] },
    { id: 4, name: "Folder 4", images: ["img5.jpg", "img6.jpg"] },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white border shadow-md rounded-md py-4 px-6 flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl text-black font-bold flex-1">Image Manager</h1>

        <div className="relative border rounded-md w-full sm:w-[300px] flex-shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <Search className="h-5 w-5 text-black" />
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none bg-gray-100 focus:bg-gray-50"
          />
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="bg-green-500 rounded text-white px-4 py-2"
        >
          Create Folder
        </Button>
      </div>

      {/* Folder Grid Section */}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <div key={folder.id} className="relative group">
            <Link href={`/dashboard/gallery/folder/${folder.id}`}>
              <Card className="cursor-pointer hover:bg-gray-200">
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-gray-300 p-10 flex items-center justify-center rounded-full">
                    <FolderOpen className="h-20 w-20" />
                  </div>
                  <p className="mt-2 font-medium text-center">{folder.name}</p>
                </CardHeader>
              </Card>
            </Link>
            <button className="absolute top-2 right-2 text-red-500 p-2 hover:bg-gray-200 hover:rounded-full opacity-0 group-hover:opacity-100 transition">
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AddFolderModal isOpen={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Page;
