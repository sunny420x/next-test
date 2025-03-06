"use client"
import Link from "next/link";
import NavLink from "./nav-link";
import { removeToken } from "../utills/action";
import Swal from "sweetalert2";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-team", label: "Our Team" },
];

const auth = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
]

export default function Header(user: any) {
  const logout = () => {
    removeToken()
    Swal.fire({
        title: "Logged out !",
        icon: "success"
    });
  }

  return (
    <header className="bg-black/100 text-white">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="font-bold">Big Bother Project</Link>

        <ul className="flex gap-4">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          
          {user && user.user ? (
            <div>
              <div className="cursor-pointer" onClick={() => logout()} key={"logout"}>
                Logout (as {user.user?.username})
              </div>
            </div>
          ) : (
            <ul className="flex gap-4">
            {auth.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
}