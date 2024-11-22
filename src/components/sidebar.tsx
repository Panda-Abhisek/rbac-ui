import Link from "next/link"
import { Users, UserCircle, Shield } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">RBAC Admin</h1>
      </div>
      <nav className="mt-8">
        <Link href="/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <Users className="mr-2" />
          Users
        </Link>
        <Link href="/roles" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <UserCircle className="mr-2" />
          Roles
        </Link>
        <Link href="/permissions" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <Shield className="mr-2" />
          Permissions
        </Link>
      </nav>
    </div>
  )
}

