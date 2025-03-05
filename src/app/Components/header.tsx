import Link from "next/link";
import NavLink from "./nav-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-team", label: "Our Team" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function Header() {
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
        </ul>
      </nav>
    </header>
  );
}