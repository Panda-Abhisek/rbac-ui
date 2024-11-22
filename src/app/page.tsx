import { Layout } from "@/components/layout"

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Welcome to RBAC Admin</h1>
      <p className="mt-4">Select a section from the sidebar to manage users, roles, and permissions.</p>
    </Layout>
  )
}

