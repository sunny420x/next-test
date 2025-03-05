import Link from "next/link";
import NavLink from "./nav-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" },
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