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

type Role = {
  id: number
  name: string
  permissions: string[]
}

const initialRoles: Role[] = [
  { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
  { id: 2, name: "User", permissions: ["read"] },
  { id: 3, name: "Editor", permissions: ["read", "write"] },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(() => {
    if (typeof window !== 'undefined') {
      const savedRoles = localStorage.getItem('roles');
      return savedRoles ? JSON.parse(savedRoles) : initialRoles;
    }
    return initialRoles;
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles]);

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
              <TableCell>{role.permissions.join(", ")}</TableCell>
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
      />
    </Layout>
  )
}

