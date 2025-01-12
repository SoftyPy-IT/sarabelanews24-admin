/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const LoadingAnimation = () => {
  const loading = require("@public/assets/loading.json");

  return (
    <div className="flex h-screen items-center justify-center">
      <Suspense fallback={<LoadingFallback />}>
        <Lottie animationData={loading} className="w-full max-w-[400px]" />
      </Suspense>
    </div>
  );
};

export default LoadingAnimation;
