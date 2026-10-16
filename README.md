# Employee Directory

A web application for viewing and managing employee records. The frontend is built with React, TypeScript and Vite, and the backend is a PHP API that runs on XAMPP (Apache).

## Folder Location

The project is split into two parts, stored in two different places on the computer:

| Part     | Folder location                      |
|----------|--------------------------------------|
| Frontend | `C:\projects\employee-directory`     |
| Backend  | `C:\xampp\htdocs\employee-api`       |

- In the **C: drive** there is a `projects` folder. Inside it is the `employee-directory` folder, which contains the React frontend.
- The **`employee-api`** folder is inside the XAMPP `htdocs` folder, so Apache can serve it.

## Frontend Structure (`C:\projects\employee-directory`)

```
employee-directory/
├── node_modules/        # not uploaded to GitHub
├── public/
├── src/                 # React + TypeScript source code
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Backend Structure (`C:\xampp\htdocs\employee-api`)

```
employee-api/
└── index.php            # PHP API
```

## Tech Stack

| Part     | Technology              |
|----------|-------------------------|
| Frontend | React, TypeScript, Vite |
| Backend  | PHP (XAMPP / Apache)    |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (includes npm)
- [XAMPP](https://www.apachefriends.org/) with Apache (and MySQL if the API uses a database)

## Getting Started

### 1. Set up the backend

1. Place the `employee-api` folder inside:

```
   C:\xampp\htdocs\
```

2. Open the XAMPP Control Panel and start **Apache** (and **MySQL** if needed).
3. Test the API in your browser:

```
   http://localhost/employee-api/
```

### 2. Run the frontend

1. Open Command Prompt in `C:\projects\employee-directory`.
2. Run:

```bash
   npm install
   npm run dev
```

3. Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

## Available Scripts

| Command           | Description                  |
|-------------------|------------------------------|
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |

## Notes

- `node_modules/` is not stored on GitHub. Run `npm install` to create it.
- Never commit passwords, API keys, or `.env` files. Check `employee-api` for database credentials before uploading.

## Author

[@kridha888](https://github.com/kridha888)