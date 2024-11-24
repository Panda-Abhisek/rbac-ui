# RBAC UI - Role-Based Access Control User Interface

## Overview

RBAC UI is a React-based web application that provides a user-friendly interface for managing Role-Based Access Control (RBAC) in a system. It allows administrators to manage users, roles, and permissions efficiently.

## Features

- User Management
  - View list of users
  - Add new users
  - Edit existing users
  - Delete users
  - Toggle user status (active/inactive)
- Role Management
  - View list of roles
  - Add new roles
  - Edit existing roles
  - Delete roles
  - Assign permissions to roles
- Permissions Management
  - View permissions matrix
  - Assign/revoke permissions for roles
- Responsive design with sidebar navigation
- Clean and modern UI using Tailwind CSS and shadcn/ui components

## Tech Stack

- React
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Setup

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/rbac-ui.git
   cd rbac-ui
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Navigate through the sidebar to access different sections:
  - Users: Manage user accounts
  - Roles: Manage roles and their permissions
  - Permissions: View and edit the permissions matrix

## Project Structure

- \`app/\`: Next.js app directory containing page components
- \`components/\`: Reusable React components
- \`public/\`: Static assets
- \`styles/\`: Global styles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

