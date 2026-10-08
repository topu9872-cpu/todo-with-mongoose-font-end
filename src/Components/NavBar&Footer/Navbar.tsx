import Link from "next/link";
import NavLink from "./NavLink";

const Navbar = () => {
  const user = { name: "mehedi hasan topu" };

  const Links = (
    <ul className="lg:flex justify-between">
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/tasks">Tasks</NavLink>
      </li>
      <li>
        <NavLink href="/about">About</NavLink>
      </li>
      {user && (
        <li>
          <NavLink href="/profile">Profile</NavLink>
        </li>
      )}
    </ul>
  );
  return (
    <nav className=" bg-base-100 shadow-sm">
      <div className="navbar max-w-11/12 mx-auto">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <Link href={"/"} className="btn btn-ghost text-xl">
            TODO
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex justify-between">
          <ul className="menu menu-horizontal px-1 flex justify-between">
            {Links}
          </ul>
        </div>
        <div className="navbar-end">
          
            {user ? (
              <div className="flex gap-6 items-center">
                <h1 className="max-w-26 hover:max-w-xs truncate transition-all duration-2000 ease-in-out cursor-pointer text-blue-600 text-sm">
                  Hi, {user?.name || "mehedi hasan topu"}
                </h1>
                <button className="text-red-500 cursor-pointer font-bold ">
                  Logout
                </button>
              </div>
            ) : (
              <Link href={"/login"} className="text-blue-600 font-bold ">
                Login
              </Link>
            )}
          </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
