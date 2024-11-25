"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, UserCircle, Shield, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: "/users", icon: Users, label: "Users" },
    { href: "/roles", icon: UserCircle, label: "Roles" },
    { href: "/permissions", icon: Shield, label: "Permissions" },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-auto md:w-64
      `}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">RBAC Admin</h1>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}

