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
import { Checkbox } from "@/components/ui/checkbox"

type Role = {
  id: number
  name: string
}

type Permission = {
  id: number
  name: string
}

type RolePermission = {
  roleId: number
  permissionId: number
}

const initialRoles: Role[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "User" },
  { id: 3, name: "Editor" },
]

const initialPermissions: Permission[] = [
  { id: 1, name: "Read" },
  { id: 2, name: "Write" },
  { id: 3, name: "Delete" },
]

const initialRolePermissions: RolePermission[] = [
  { roleId: 1, permissionId: 1 },
  { roleId: 1, permissionId: 2 },
  { roleId: 1, permissionId: 3 },
  { roleId: 2, permissionId: 1 },
  { roleId: 3, permissionId: 1 },
  { roleId: 3, permissionId: 2 },
]

export default function PermissionsPage() {
  const [roles] = useState<Role[]>(initialRoles)
  const [permissions] = useState<Permission[]>(initialPermissions)
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(() => {
    if (typeof window !== 'undefined') {
      const savedRolePermissions = localStorage.getItem('rolePermissions');
      return savedRolePermissions ? JSON.parse(savedRolePermissions) : initialRolePermissions;
    }
    return initialRolePermissions;
  });

  useEffect(() => {
    localStorage.setItem('rolePermissions', JSON.stringify(rolePermissions));
  }, [rolePermissions]);

  const handlePermissionChange = (roleId: number, permissionId: number) => {
    setRolePermissions(prev => {
      const exists = prev.some(rp => rp.roleId === roleId && rp.permissionId === permissionId)
      if (exists) {
        return prev.filter(rp => !(rp.roleId === roleId && rp.permissionId === permissionId))
      } else {
        return [...prev, { roleId, permissionId }]
      }
    })
  }

  const isChecked = (roleId: number, permissionId: number) => {
    return rolePermissions.some(rp => rp.roleId === roleId && rp.permissionId === permissionId)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Permissions Matrix</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role / Permission</TableHead>
            {permissions.map(permission => (
              <TableHead key={permission.id}>{permission.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              {permissions.map(permission => (
                <TableCell key={permission.id}>
                  <Checkbox
                    checked={isChecked(role.id, permission.id)}
                    onCheckedChange={() => handlePermissionChange(role.id, permission.id)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

