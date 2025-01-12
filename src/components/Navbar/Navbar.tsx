import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="flex justify-end items-center gap-4 ">
      {/* Admin Label */}
      <div>
        <h1 className="text-gray-800 font-bold text-lg">Admin</h1>
      </div>

      {/* User Dropdown */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition">
              <CircleUser size={36}  />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 bg-white rounded-lg shadow-xl border border-gray-200 w-48"
          >
            <DropdownMenuLabel className="text-gray-600 text-sm font-semibold px-4 py-2">
              Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-gray-200" />
            <DropdownMenuItem
              onClick={() => {
                console.log("View Profile clicked");
              }}
              className="cursor-pointer px-4 py-2 text-gray-700 text-sm hover:bg-blue-100 hover:text-blue-600 rounded transition"
            >
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log("Logout clicked");
              }}
              className="cursor-pointer px-4 py-2 text-gray-700 text-sm hover:bg-red-100 hover:text-red-600 rounded transition"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
