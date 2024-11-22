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
import { RoleDialog } from "@/components/role-dialog"

type Permission = {
  id: number
  name: string
}

type Role = {
  id: number
  name: string
  permissions: number[] // Array of permission IDs
}

const initialPermissions: Permission[] = [
  { id: 1, name: "Read" },
  { id: 2, name: "Write" },
  { id: 3, name: "Delete" },
]

const initialRoles: Role[] = [
  { id: 1, name: "Admin", permissions: [1, 2, 3] },
  { id: 2, name: "User", permissions: [1] },
  { id: 3, name: "Editor", permissions: [1, 2] },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [permissions] = useState<Permission[]>(initialPermissions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedRoles = localStorage.getItem('roles')
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('roles', JSON.stringify(roles))
    }
  }, [roles, isLoaded])

  const handleAddRole = () => {
    setEditingRole(null)
    setIsDialogOpen(true)
  }

  const handleEditRole = (role: Role) => {
    setEditingRole(role)
    setIsDialogOpen(true)
  }

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter(role => role.id !== roleId))
  }

  const handleSaveRole = (role: Role) => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === role.id ? role : r))
    } else {
      setRoles([...roles, { ...role, id: roles.length + 1 }])
    }
    setIsDialogOpen(false)
  }

  const getPermissionNames = (permissionIds: number[]) => {
    return permissionIds.map(id => permissions.find(p => p.id === id)?.name).join(", ")
  }

  if (!isLoaded) {
    return <Layout><div>Loading...</div></Layout>
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Roles</h1>
        <Button onClick={handleAddRole}>Add Role</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{getPermissionNames(role.permissions)}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => handleEditRole(role)}>
                  Edit
                </Button>
                <Button variant="outline" onClick={() => handleDeleteRole(role.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RoleDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveRole}
        role={editingRole}
        permissions={permissions}
      />
    </Layout>
  )
}

