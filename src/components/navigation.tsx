import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/users" className="text-blue-600 hover:underline">
            Users
          </Link>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  )
}

