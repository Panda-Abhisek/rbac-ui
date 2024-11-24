"use client"

import { useState } from "react"
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
import { useRbac, Role, Permission } from "@/contexts/RbacContext"

export default function RolesPage() {
  const { roles, setRoles, permissions } = useRbac()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

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

  const handleSaveRole = (updatedRole: Role) => {
    setRoles(prevRoles => {
      if (updatedRole.id) {
        return prevRoles.map(role => role.id === updatedRole.id ? updatedRole : role)
      } else {
        return [...prevRoles, { ...updatedRole, id: Math.max(...prevRoles.map(r => r.id)) + 1 }]
      }
    })
    setIsDialogOpen(false)
  }

  const getPermissionNames = (permissionIds: number[]) => {
    return permissionIds.map(id => permissions.find(p => p.id === id)?.name).filter(Boolean).join(", ")
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

