"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

export type Permission = {
  id: number
  name: string
}

export type Role = {
  id: number
  name: string
  permissions: number[]
}

type RbacContextType = {
  roles: Role[]
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
  permissions: Permission[]
  setPermissions: React.Dispatch<React.SetStateAction<Permission[]>>
}

const RbacContext = createContext<RbacContextType | undefined>(undefined)

export const useRbac = () => {
  const context = useContext(RbacContext)
  if (!context) {
    throw new Error('useRbac must be used within a RbacProvider')
  }
  return context
}

const initialRoles: Role[] = [
  { id: 1, name: "Admin", permissions: [1, 2, 3] },
  { id: 2, name: "User", permissions: [1] },
  { id: 3, name: "Editor", permissions: [1, 2] },
]

const initialPermissions: Permission[] = [
  { id: 1, name: "Read" },
  { id: 2, name: "Write" },
  { id: 3, name: "Delete" },
]

export const RbacProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)

  useEffect(() => {
    const savedRoles = localStorage.getItem('roles')
    const savedPermissions = localStorage.getItem('permissions')
    if (savedRoles) setRoles(JSON.parse(savedRoles))
    if (savedPermissions) setPermissions(JSON.parse(savedPermissions))
  }, [])

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles))
  }, [roles])

  useEffect(() => {
    localStorage.setItem('permissions', JSON.stringify(permissions))
  }, [permissions])

  return (
    <RbacContext.Provider value={{ roles, setRoles, permissions, setPermissions }}>
      {children}
    </RbacContext.Provider>
  )
}

