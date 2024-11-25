"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserDialog } from "@/components/user-dialog"

type Role = {
  id: number
  name: string
  permissions: number[]
}

type User = {
  id: number
  name: string
  email: string
  roleId: number | null
  status: "active" | "inactive"
}

const initialRoles: Role[] = [
  { id: 1, name: "Admin", permissions: [1, 2, 3] },
  { id: 2, name: "User", permissions: [1] },
  { id: 3, name: "Editor", permissions: [1, 2] },
]

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", roleId: 1, status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", roleId: 2, status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", roleId: 3, status: "inactive" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    const savedRoles = localStorage.getItem('roles')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users, isLoaded])

  const handleAddUser = () => {
    setEditingUser(null)
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    ))
  }

  const handleSaveUser = (user: User) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === user.id ? user : u))
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }])
    }
    setIsDialogOpen(false)
  }

  const getRoleName = (roleId: number | null) => {
    if (roleId === null) return "No Role"
    return roles.find(role => role.id === roleId)?.name || "Unknown"
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6 mt-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleName(user.roleId)}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => handleEditUser(user)}>
                  Edit
                </Button>
                <Button variant="outline" className="mr-2" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
                <Button variant="outline" onClick={() => handleToggleStatus(user.id)}>
                  Toggle Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
        roles={roles}
      />
    </Layout>
  )
}

