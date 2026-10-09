"use client";

import type { Navbar } from "@/src/types/NavBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href }: Navbar) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 mx-1 py-1.5 text-sm font-medium transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
