"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/assets/dailyTimes24.png";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  PlusIcon,
  List,
  ChartNetworkIcon,
  ChartNoAxesCombined,
  Zap,
  ImageIcon,
  VideoIcon,
  Folder,
  UserRoundCog,
  GalleryThumbnailsIcon,
  ChartLine
} from "lucide-react";

const Aside = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard/dashboard",
      label: "Dashboard",
      icon: ChartLine,
    },
    {
      href: "/dashboard",
      label: "Lead News",
      icon: ChartNetworkIcon,
      children: [
        { href: "/dashboard/add-lead-news", label: "Add News", icon: PlusIcon },
        {
          href: "/dashboard/list-lead-news",
          label: "List Lead News",
          icon: List,
        },
      ],
    },
    {
      href: "/all-tranding",
      label: "Trending News",
      icon: ChartNoAxesCombined,
      children: [
        {
          href: "/dashboard/add-tranding-news",
          label: "Add News",
          icon: PlusIcon,
        },
        {
          href: "/dashboard/list-tranding-news",
          label: "List Trending News",
          icon: List,
        },
      ],
    },
    {
      href: "/all-bangladesh",
      label: "Bangladesh",
      icon: Zap,
      children: [
        {
          href: "/dashboard/add-bangladesh-news",
          label: "Add News",
          icon: PlusIcon,
        },
        {
          href: "/dashboard/list-bangladesh-news",
          label: "List Bangladesh News",
          icon: List,
        },
      ],
    },
    {
      href: "/Add-Photo-News",
      label: "Photo News",
      icon: ImageIcon,
      children: [
        {
          href: "/dashboard/add-photo-news",
          label: "Add Image",
          icon: PlusIcon,
        },
        {
          href: "/dashboard/list-photo-news",
          label: "Image List",
          icon: List,
        },
      ],
    },
    {
      href: "/video",
      label: "Video News",
      icon: VideoIcon,
      children: [
        { href: "/dashboard/add-video", label: "Add Video", icon: PlusIcon },
        {
          href: "/dashboard/list-video-gallery",
          label: "Video List",
          icon: List,
        },
      ],
    },
    {
      href: "/img",
      label: "Gallery",
      icon: GalleryThumbnailsIcon,
      children: [
        {
          href: "/dashboard/gallery/all-img",
          label: "All Images",
          icon: ImageIcon,
        },
        { href: "/dashboard/gallery/folder", label: "Folder", icon: Folder },
      ],
    },
    {
      href: "/dashboard/user",
      label: "User Management",
      icon: UserRoundCog,
    },
  ];

  return (
    <aside className="text-white h-full p-6">
      {/* Logo and Branding */}
      <div className="text-center py-4">
        <Link
          href="/"
          className="inline-block transition-transform hover:scale-105"
        >
          <Image
            src={logo}
            alt="Daily Times 24 Logo"
            width={100}
            height={100}
            priority
          />
        </Link>
        <p className="text-lg   font-bold">
          সত্যের সন্ধানে সব সময়
        </p>
      </div>

      {/* Navigation Menu */}
      <nav>
        <Accordion type="single" collapsible className="space-y-4">
          {routes.map((route) => (
            <AccordionItem
              key={route.href}
              value={route.href}
              className="border-none"
            >
              {route.children ? (
                <>
                  <AccordionTrigger
                    className={cn(
                      "flex items-center justify-between px-4 py-3 text-sm font-medium",
                      "hover:bg-blue-600/20 data-[state=open]:bg-blue-600/20",
                      pathname === route.href && "bg-blue-600/30 text-blue-200"
                    )}
                  >
                    <span className="flex items-center space-x-2">
                      {route.icon && <route.icon className="w-5 h-5" />}
                      <span>{route.label}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 ml-4 space-y-2">
                      {route.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm  transition-colors",
                            "hover:bg-blue-600/20",
                            pathname === child.href &&
                              "text-blue-200  border-b-2 border-white"
                          )}
                        >
                          <child.icon className="w-4 h-4 mr-2" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </>
              ) : (
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium  transition-colors",
                    "hover:bg-blue-600/20",
                    pathname === route.href &&
                      "text-blue-200 border-b-2 border-white"
                  )}
                >
                  <route.icon className="w-5 h-5 mr-2" />
                  {route.label}
                </Link>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </aside>
  );
};

export default Aside;
