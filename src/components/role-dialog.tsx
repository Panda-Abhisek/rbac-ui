"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Role, Permission } from "@/contexts/RbacContext"
import { ScrollArea } from "@/components/ui/scroll-area"

type RoleDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (role: Role) => void
  role: Role | null
  permissions: Permission[]
}

export function RoleDialog({ isOpen, onClose, onSave, role, permissions }: RoleDialogProps) {
  const [name, setName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])

  useEffect(() => {
    if (role) {
      setName(role.name)
      setSelectedPermissions(role.permissions)
    } else {
      setName("")
      setSelectedPermissions([])
    }
  }, [role])

  const handleSave = () => {
    onSave({
      id: role?.id ?? 0,
      name,
      permissions: selectedPermissions,
    })
  }

  const handlePermissionChange = (permissionId: number) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{role ? "Edit Role" : "Add Role"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left md:text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-1 md:col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
            <Label className="text-left md:text-right mt-2">Permissions</Label>
            <ScrollArea className="h-[200px] col-span-1 md:col-span-3 p-4 rounded border">
              {permissions.map(permission => (
                <div key={permission.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`permission-${permission.id}`}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionChange(permission.id)}
                  />
                  <label
                    htmlFor={`permission-${permission.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {permission.name}
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

