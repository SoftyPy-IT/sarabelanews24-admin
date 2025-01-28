"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Upload from "./Upload";
import Recent from "./Recent";

const AllImgModal = () => {
  return (
    <>
      <div className="w-full mt-5">
        <Tabs defaultValue="account" className="w-[750px] ">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="account">Recent</TabsTrigger>
            <TabsTrigger value="password">New Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Recent />
          </TabsContent>
          <TabsContent value="password" >
            <Upload />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AllImgModal;
