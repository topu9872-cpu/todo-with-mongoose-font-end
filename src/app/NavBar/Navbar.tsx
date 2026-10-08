import Link from "next/link";
import NavLink from "./NavLink";

const Navbar = () => {
  const Links = (
    <ul className="lg:flex justify-between gap-5">
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/products">Products</NavLink>
      </li>
      <li>
        <NavLink href="/profile">Profile</NavLink>
      </li>
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
          <Link href={"/login"} className="btn btn-ghost text-xl">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
