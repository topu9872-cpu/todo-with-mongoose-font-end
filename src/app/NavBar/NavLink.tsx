"use client";

import type { Navbar } from "@/src/types/NavBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href }: Navbar) => {
  const param = usePathname();
  const isActive = param === href;

  return (
    <Link href={href} className={isActive ? "bg-blue-700 text-white" : ""}>
      {children}
    </Link>
  );
};

export default NavLink;
