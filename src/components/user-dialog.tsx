"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

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

type UserDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (user: User) => void
  user: User | null
  roles: Role[]
}

export function UserDialog({ isOpen, onClose, onSave, user, roles }: UserDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [roleId, setRoleId] = useState<string>("no-role")
  const [status, setStatus] = useState<"active" | "inactive">("active")

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRoleId(user?.roleId === null ? "no-role" : user?.roleId?.toString() ?? "no-role")
      setStatus(user.status)
    } else {
      setName("")
      setEmail("")
      setRoleId("no-role")
      setStatus("active")
    }
  }, [user])

  const handleSave = () => {
    onSave({
      id: user?.id ?? 0,
      name,
      email,
      roleId: roleId === "no-role" ? null : Number(roleId),
      status,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{user ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-y-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left md:text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-1 md:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-left md:text-right">
                Role
              </Label>
              <Select 
                value={roleId} 
                onValueChange={(value) => setRoleId(value)}
              >
                <SelectTrigger className="col-span-1 md:col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-role">No Role</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-left md:text-right">
                Status
              </Label>
              <Select value={status} onValueChange={(value: "active" | "inactive") => setStatus(value)}>
                <SelectTrigger className="col-span-1 md:col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

