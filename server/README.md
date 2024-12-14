# Plivo StatusPage API

The Plivo StatusPage API is a simple Node.js backend server that allows you to manage the status of applications, services, and incidents in a public-facing status page. It provides endpoints to create, update, and view the status of various applications and their associated services, as well as any ongoing incidents.

This API is designed for use in a status page where users can view the real-time status of various applications and services, along with detailed incident reports.

---

## Features

- **Manage Applications**: Add, update, and delete applications with status.
- **Manage Services**: View and update the status of services under each application.
- **Manage Incidents**: View and manage incidents affecting services or applications.
- **In-memory storage with NeDB**: This API uses NeDB for storing data in memory.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://npmjs.com/)

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/plivo-statuspage-app.git
   cd plivo-statuspage-app
   ```

2. **Setup:**

   ```bash
   cd server
   pnpm install
   pnpm dev
   ```
