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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-white font-semibold shadow-sm"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <img
            src="/images/logo.png"
            alt="NCCDRC logo"
            className="h-14 w-14 object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden font-semibold lg:flex lg:items-center lg:gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label,
                    )
                  }
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                  className={`flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-[15px] font-semibold transition-colors ${
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
                  className="block rounded-md px-3 py-2 text-[15px] font-semibold text-slate-700 transition-colors hover:text-emerald-700"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown panel */}
              {item.dropdown && (
                <div
                  className={`absolute left-0 top-full min-w-50 origin-top rounded-lg bg-white py-2 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-all duration-150 ${
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
          className="hidden items-center rounded-sm bg-green-500 px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 lg:inline-flex"
        >
          File a Case
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-slate-700 lg:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-slate-900/30 backdrop-blur-[1px] lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-x-0 top-20 z-50 origin-top overflow-hidden bg-white shadow-lg transition-all duration-200 ease-out lg:hidden ${
          mobileOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto px-5 py-4">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="border-b border-slate-100 last:border-none"
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSubOpen(
                          mobileSubOpen === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={mobileSubOpen === item.label}
                      className="flex w-full cursor-pointer items-center justify-between py-3.5 text-[15px] font-semibold text-slate-800"
                    >
                      {item.label}
                      <ChevronDown
                        size={17}
                        strokeWidth={2.5}
                        className={`text-slate-400 transition-transform duration-150 ${
                          mobileSubOpen === item.label
                            ? "rotate-180 text-emerald-600"
                            : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-150 ease-out ${
                        mobileSubOpen === item.label
                          ? "max-h-60 pb-2"
                          : "max-h-0"
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 pl-3">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileSubOpen(null);
                            }}
                            className="rounded-md py-2.5 pl-3 text-[14px] font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-emerald-700"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <Link
            href="/file-a-case"
            onClick={() => setMobileOpen(false)}
            className="mt-5 mb-2 block rounded-md bg-green-500 px-5 py-3.5 text-center text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
          >
            File a Case
          </Link>
        </div>
      </div>
    </nav>
  );
}
