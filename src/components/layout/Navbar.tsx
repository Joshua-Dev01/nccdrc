"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

type DropdownItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Council Members", href: "/about/council-members" },
      { label: "Neutrals", href: "/about/neutrals" },
      { label: "Secretariat", href: "/about/secretariat" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    dropdown: [
      { label: "News", href: "/blog/news" },
      { label: "Gist", href: "/blog/gist" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Trainings", href: "/services/trainings" },
      { label: "Table of Fees", href: "/services/table-of-fees" },
      { label: "Room Hire", href: "/services/room-hire" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Media",
    href: "/media",
    dropdown: [
      { label: "Gallery", href: "/media/gallery" },
      { label: "Event", href: "/media/event" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full border-b font-semibold  bg-white "
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/"  >
          <img src="/images/logo.png" alt="logo" className="w-15 h-15" />
         
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex font-semibold lg:items-center lg:gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 cursor-pointer font-semibold rounded-md px-3 py-2 text-[15px]  transition-colors ${
                    openDropdown === item.label
                      ? "text-emerald-700"
                      : "text-slate-700 hover:text-emerald-700"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    strokeWidth={2.5}
                    className={`transition-transform duration-150 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="block font-semibold rounded-md px-3 py-2 text-[15px] text-slate-700 transition-colors hover:text-emerald-700"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown panel */}
              {item.dropdown && (
                <div
                  className={`absolute left-0 top-full min-w-[200px] origin-top rounded-lg border border-slate-100 bg-white py-2 shadow-lg shadow-slate-900/5 transition-all duration-150 ${
                    openDropdown === item.label
                      ? "visible translate-y-1 opacity-100"
                      : "invisible translate-y-0 opacity-0"
                  }`}
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-emerald-700"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA button (desktop) */}
        <Link
          href="/file-a-case"
          className="hidden lg:inline-flex items-center rounded-sm bg-green-500 px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
        >
          File a Case
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex items-center cursor-pointer justify-center rounded-md p-2 text-slate-700 lg:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="max-h-[calc(100vh-5rem)] overflow-y-auto px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-slate-50 last:border-none">
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSubOpen(
                          mobileSubOpen === item.label ? null : item.label
                        )
                      }
                      aria-expanded={mobileSubOpen === item.label}
                      className="flex w-full items-center justify-between py-3 text-[15px] font-medium text-slate-700"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          mobileSubOpen === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileSubOpen === item.label && (
                      <div className="pb-2 pl-4">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileSubOpen(null);
                            }}
                            className="block py-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[15px] font-medium text-slate-700 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/file-a-case"
              onClick={() => setMobileOpen(false)}
              className="mt-3 mb-2 block rounded-full bg-emerald-500 px-5 py-3 text-center text-[15px] font-semibold text-white"
            >
              File a Case
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

