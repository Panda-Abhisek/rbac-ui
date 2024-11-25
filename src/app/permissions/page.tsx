"use client"

import { Layout } from "@/components/layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useRbac } from "@/contexts/RbacContext"

export default function PermissionsPage() {
  const { roles, setRoles, permissions } = useRbac()

  const handlePermissionChange = (roleId: number, permissionId: number) => {
    setRoles(prevRoles => 
      prevRoles.map(role => {
        if (role.id === roleId) {
          const updatedPermissions = role.permissions.includes(permissionId)
            ? role.permissions.filter(id => id !== permissionId)
            : [...role.permissions, permissionId]
          return { ...role, permissions: updatedPermissions }
        }
        return role
      })
    )
  }

  const isChecked = (roleId: number, permissionId: number) => {
    const role = roles.find(r => r.id === roleId)
    return role ? role.permissions.includes(permissionId) : false
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 mt-8">Permissions Matrix</h1>
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

