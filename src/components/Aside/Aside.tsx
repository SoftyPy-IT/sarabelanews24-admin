"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../src/logo/logo2.svg";
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
  ImageIcon,
  VideoIcon,
  Folder,
  UserRoundCog,
  GalleryThumbnailsIcon,
  ChartLine,
  NotebookIcon,
  DatabaseBackup,
  ArchiveRestore,
  Bell,
} from "lucide-react";
import { Route } from "next";

const Aside = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: ChartLine,
    },
    {
      href: "/news",
      label: "News",
      icon: ChartNetworkIcon,
      children: [
        { href: "/dashboard/add-news", label: "Add News", icon: PlusIcon },
        {
          href: "/dashboard/news-category",
          label: "Category",
          icon: PlusIcon,
        },
        {
          href: "/dashboard/list-news",
          label: "List News",
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
          label: "Add Photo News",
          icon: PlusIcon,
        },
        {
          href: "/dashboard/list-photo-news",
          label: "Photo News List",
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
          href: "/dashboard/list-video-news",
          label: "Video List",
          icon: List,
        },
        {
          href: "/dashboard/news-category",
          label: "Category",
          icon: PlusIcon,
        },
      ],
    },
    {
      href: "/dashboard/send-notification",
      label: "Send Notification",
      icon: Bell,
    },
    {
      href: "/Advertisement",
      label: "Advertisement",
      icon: NotebookIcon,
      children: [
        {
          href: "/dashboard/add-advertisement",
          label: "Add Advertisement",
          icon: PlusIcon,
        },
        {
          href: "/dashboard/list-advertisement",
          label: "Advertisement List",
          icon: List,
        },
      ],
    },
    {
      href: "/img",
      label: "Stock Photo",
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

    {
      href: "/dashboard/backup",
      label: "Backup & Settings",
      icon: DatabaseBackup,
      children: [
        {
          href: "/dashboard/backup",
          label: "Backup Database",
          icon: DatabaseBackup,
        },
        {
          href: "/dashboard/restore",
          label: "Restore Database",
          icon: ArchiveRestore,
        },
      ],
    },
  ];

  return (
    <aside className="text-white h-full overflow-auto">
      <div className="text-center">
        <Link
          href="/dashboard"
          className="inline-block transition-transform hover:scale-105"
          onClick={toggleSidebar} // Close sidebar when clicked
        >
          <Image src={logo} alt="sarabelanews24" width={180} height={100} priority />
        </Link>
      </div>

      <nav>
        <Accordion type="single" collapsible className="space-y-4">
          {routes.map((route) => (
            <AccordionItem key={route.href} value={route.href} className="border-none">
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
                          href={child.href as Route<string>}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm transition-colors",
                            "hover:bg-blue-600/20",
                            pathname === child.href && "text-blue-200 border-b-2 border-white"
                          )}
                          onClick={toggleSidebar} // Close sidebar when clicked
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
                  href={route.href as Route<string>}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium transition-colors",
                    "hover:bg-blue-600/20",
                    pathname === route.href && "text-blue-200 border-b-2 border-white"
                  )}
                  onClick={toggleSidebar} // Close sidebar when clicked
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
