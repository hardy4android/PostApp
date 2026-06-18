# PostApp API

This is the backend server for PostApp. It is built using Node.js and Express, utilizing Supabase for data management and authentication.

## Tech Stack
- **Node.js** (>= 20)
- **Express.js**
- **Supabase JS Client**
- **Dotenv** & **CORS**

## Setup

1. **Install Dependencies** (from the monorepo root):
   ```bash
   bun run install:all
   ```

2. **Environment Variables**:
   Create a `.env` file in the `apps/api` directory and add your required variables. For example:
   ```env
   PORT=8002
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_or_service_key
   ```

## Available Scripts

From the `apps/api` directory, you can run:

- `bun run start` (or `node src/index.js`): Starts the API server.
- `bun run check`: Runs Node's built-in syntax checker on the main script.

*(Alternatively, you can run the server from the monorepo root using `bun run start:api`)*
