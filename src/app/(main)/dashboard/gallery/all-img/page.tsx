'use client'

import React, { useState } from "react";
import AllImages from "./_components/AllImages";
import TopBar from "./_components/TopBar";


const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <>
      <TopBar isOpen={isOpen} setIsOpen={setIsOpen} onOpenChange={handleOpenChange} />
      <AllImages />
    </>
  );
};

export default Page;
