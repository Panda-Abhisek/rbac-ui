"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

type Role = {
  id: number
  name: string
  permissions: string[]
}

type RoleDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (role: Role) => void
  role: Role | null
}

const availablePermissions = ["read", "write", "delete"]

export function RoleDialog({ isOpen, onClose, onSave, role }: RoleDialogProps) {
  const [name, setName] = useState("")
  const [permissions, setPermissions] = useState<string[]>([])

  useEffect(() => {
    if (role) {
      setName(role.name)
      setPermissions(role.permissions)
    } else {
      setName("")
      setPermissions([])
    }
  }, [role])

  const handleSave = () => {
    onSave({
      id: role?.id ?? 0,
      name,
      permissions,
    })
  }

  const handlePermissionChange = (permission: string) => {
    setPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Permissions</Label>
            <div className="col-span-3">
              {availablePermissions.map(permission => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={permissions.includes(permission)}
                    onCheckedChange={() => handlePermissionChange(permission)}
                  />
                  <label
                    htmlFor={permission}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

