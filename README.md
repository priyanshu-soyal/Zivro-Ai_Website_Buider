# Zivro AI Website Builder

This project is a full-stack web application for building and managing websites using AI-powered tools.

## Features
- AI-powered website builder
- Project management (create, preview, and manage projects)
- Community sharing
- User authentication
- Pricing plans
- Settings and account management
- Google sitemap.xml for SEO

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **Database:** Prisma ORM
- **Deployment:** Vercel (Frontend), Custom/Cloud (Backend)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Site Builder
   ```
2. Install dependencies for both Client and Server:
   ```sh
   cd Client
   npm install
   cd ../Server
   npm install
   ```

### Running Locally
1. Start the backend server:
   ```sh
   cd Server
   npm run dev
   ```
2. Start the frontend:
   ```sh
   cd ../Client
   npm run dev
   ```
3. Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Sitemap
- The sitemap is available at `/sitemap.xml` (e.g., `https://zivro-ai-websites-buider.vercel.app/sitemap.xml`).
- Submit this URL to Google Search Console for SEO.

## Folder Structure
```
Client/      # Frontend React app
Server/      # Backend Node.js/Express API
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
