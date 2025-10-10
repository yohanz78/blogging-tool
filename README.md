# 📝 Modern Blogging Platform

### A Full-Stack Content Management System

[![Node.js](https://img.shields.io/badge/Node.js-16.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

*A full-featured blogging platform that empowers authors to create and manage content while providing readers with an engaging, interactive experience.*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Demo](#-demo)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌟 Overview

The Modern Blogging Platform is a comprehensive content management system built with Node.js and Express. It features a clean, responsive interface powered by Tailwind CSS and provides a complete solution for both content creators and readers.

**Key Highlights:**
- 🔐 Secure authentication and session management
- 📝 Full CRUD operations for article management
- 💬 Interactive commenting system
- 📊 Real-time article statistics (views and likes)
- 🎨 Customizable blog branding
- 📱 Responsive design for all devices

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 👨‍💻 For Authors

- ✅ **Secure Authentication**
  - User registration and login
  - Session-based authorization
  - Protected routes middleware

- ✍️ **Article Management**
  - Create, edit, and delete articles
  - Draft and publish workflow
  - Article preview functionality

- 🎯 **Dashboard & Analytics**
  - Comprehensive article overview
  - View statistics and engagement metrics
  - Latest activity tracking

- ⚙️ **Customization**
  - Personalized blog title and subtitle
  - Author profile settings
  - Blog information management

</td>
<td width="50%" valign="top">

### 👥 For Readers

- 📖 **Content Discovery**
  - Browse all published articles
  - Clean, organized article listing
  - Fast and responsive interface

- 💬 **Engagement Features**
  - Interactive commenting system
  - Article likes and reactions
  - Reader name attribution

- 📊 **Rich Reading Experience**
  - Full article view with metadata
  - Publication date and author info
  - View count tracking
  - Responsive typography

- 🎨 **Modern UI/UX**
  - Tailwind CSS styling
  - Mobile-responsive design
  - Intuitive navigation

</td>
</tr>
</table>

---

## 🛠️ Technology Stack

<div align="center">

| Category                 | Technology      |
| ------------------------ | --------------- |
| **Backend Framework**    | Express.js 4.18 |
| **Runtime**              | Node.js 16+     |
| **Database**             | SQLite3 5.1     |
| **Template Engine**      | EJS 3.1         |
| **Styling**              | Tailwind CSS    |
| **Session Management**   | express-session |
| **HTTP Method Override** | method-override |
| **Date Utilities**       | date-fns 3.6    |
| **Development**          | nodemon 3.1     |

</div>

### Architecture Highlights

```
┌─────────────────┐
│   Client        │
│   (Browser)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Express.js    │ ◄── Session Management
│   Middleware    │ ◄── Authentication
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│ Routes │ │  EJS   │
│        │ │ Views  │
└───┬────┘ └────────┘
    │
    ▼
┌────────────────┐
│  SQLite3 DB    │
└────────────────┘
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version   | Download                                                                            |
| ----------- | --------- | ----------------------------------------------------------------------------------- |
| **Node.js** | >= 16.0.0 | [nodejs.org](https://nodejs.org/)                                                   |
| **NPM**     | >= 8.0.0  | Bundled with Node.js                                                                |
| **SQLite3** | Latest    | [Installation Guide](https://www.tutorialspoint.com/sqlite/sqlite_installation.htm) |

> 💡 **Tip:** macOS and most Linux distributions come with SQLite pre-installed

### Quick Start

Get up and running in 3 simple steps:

#### 1️⃣ Clone & Install

```bash
# Install dependencies
npm install
```

#### 2️⃣ Initialize Database

**macOS / Linux:**
```bash
npm run build-db
```

**Windows:**
```bash
npm run build-db-win
```

#### 3️⃣ Launch Application

**Production Mode:**
```bash
npm start
```

**Development Mode** (with hot-reload):
```bash
npm run dev
```

#### 4️⃣ Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

🎉 **Success!** You should see the blogging platform homepage.

---

## 📁 Project Structure

```
blogging-tool/
│
├── 📄 index.js                          # Application entry point & server configuration
├── 📄 package.json                      # Dependencies and npm scripts
├── 📄 db_schema.sql                     # Database schema & table definitions
├── 📄 tailwind.config.js                # Tailwind CSS configuration
├── 🗄️  database.db                       # SQLite database (auto-generated)
│
├── 📂 middleware/
│   └── 🔒 auth.js                        # Authentication & route protection
│
├── 📂 routes/
│   ├── ✍️  authors.js                     # Author endpoints (CRUD operations)
│   └── 👥 readers.js                     # Reader endpoints (view & interact)
│
├── 📂 views/                            # EJS Templates
│   ├── 🏠 homepage.ejs                   # Public landing page
│   ├── 📝 author-signup.ejs             # Author registration form
│   ├── 🔐 author-login.ejs              # Author authentication
│   ├── 📊 author-home.ejs               # Author dashboard & article list
│   ├── ➕ author-create-article.ejs     # New article form
│   ├── ✏️  author-edit-article.ejs       # Article editing interface
│   ├── ⚙️  author-settings.ejs          # Blog customization
│   ├── 📰 reader-home.ejs               # Published articles grid
│   ├── 📖 reader-article.ejs            # Single article view with comments
│   └── 🎨 layouts-blog-info.ejs         # Shared header/navigation layout
│
└── 📂 public/
    └── 🎨 main.css                       # Compiled Tailwind CSS styles
```

### Key Components

- **`index.js`**: Express server setup, middleware configuration, and route registration
- **`middleware/auth.js`**: Protects author routes with session-based authentication
- **`routes/`**: Modular route handlers for clean separation of concerns
- **`views/`**: EJS templates for server-side rendering
- **`db_schema.sql`**: Version-controlled database structure

---

## 🗄️ Database Schema

The application uses a relational SQLite database with three core tables:

### Entity Relationship Diagram

```
┌─────────────────┐
│     Authors     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ email (UNIQUE)  │
│ password        │
│ blog_title      │
│ blog_subtitle   │
│ latest_edit     │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│    Articles     │
├─────────────────┤
│ id (PK)         │
│ title           │
│ subtitle        │
│ content         │
│ published       │
│ views           │
│ likes           │
│ created_at      │
│ updated_at      │
│ published_at    │
│ author_id (FK)  │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│    Comments     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ comment         │
│ created_at      │
│ article_id (FK) │
└─────────────────┘
```

### Table Descriptions

<details>
<summary><b>Authors Table</b></summary>

Stores author account information and blog branding.

| Column          | Type         | Constraints                | Description                 |
| --------------- | ------------ | -------------------------- | --------------------------- |
| `id`            | INTEGER      | PRIMARY KEY, AUTOINCREMENT | Unique author identifier    |
| `name`          | VARCHAR(50)  | NOT NULL                   | Author's display name       |
| `email`         | VARCHAR(100) | NOT NULL, UNIQUE           | Login email address         |
| `password`      | VARCHAR(100) | NOT NULL                   | Hashed password             |
| `blog_title`    | VARCHAR(255) | -                          | Customizable blog title     |
| `blog_subtitle` | VARCHAR(255) | -                          | Blog tagline/subtitle       |
| `latest_edit`   | DATETIME     | -                          | Last modification timestamp |

</details>

<details>
<summary><b>Articles Table</b></summary>

Stores blog posts with metadata and engagement metrics.

| Column         | Type         | Constraints                | Description                  |
| -------------- | ------------ | -------------------------- | ---------------------------- |
| `id`           | INTEGER      | PRIMARY KEY, AUTOINCREMENT | Unique article identifier    |
| `title`        | VARCHAR(255) | NOT NULL                   | Article headline             |
| `subtitle`     | VARCHAR(255) | -                          | Article subheading           |
| `content`      | TEXT         | -                          | Article body (HTML/Markdown) |
| `published`    | BOOLEAN      | -                          | Publication status           |
| `views`        | INTEGER      | DEFAULT 0                  | View count                   |
| `likes`        | INTEGER      | DEFAULT 0                  | Like count                   |
| `created_at`   | DATETIME     | NOT NULL                   | Creation timestamp           |
| `updated_at`   | DATETIME     | -                          | Last update timestamp        |
| `published_at` | DATETIME     | -                          | Publication timestamp        |
| `author_id`    | INTEGER      | FOREIGN KEY                | Reference to authors table   |

</details>

<details>
<summary><b>Comments Table</b></summary>

Stores reader comments on articles.

| Column       | Type        | Constraints                    | Description                 |
| ------------ | ----------- | ------------------------------ | --------------------------- |
| `id`         | INTEGER     | PRIMARY KEY, AUTOINCREMENT     | Unique comment identifier   |
| `name`       | VARCHAR(50) | NOT NULL                       | Commenter's name            |
| `comment`    | TEXT        | NOT NULL                       | Comment content             |
| `created_at` | DATETIME    | NOT NULL                       | Comment timestamp           |
| `article_id` | INTEGER     | FOREIGN KEY, ON DELETE CASCADE | Reference to articles table |

</details>

---

## 📚 API Documentation

### 🌐 Public Routes

| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| `GET`  | `/`                           | Homepage - Landing page       |
| `GET`  | `/reader`                     | Browse all published articles |
| `GET`  | `/reader/article/:id`         | View article with comments    |
| `POST` | `/reader/article/:id/comment` | Submit a comment              |
| `PUT`  | `/reader/article/:id/like`    | Like an article               |

### 🔐 Protected Routes (Authentication Required)

#### Authentication Endpoints

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| `GET`  | `/author/signup` | Display registration form |
| `POST` | `/author/signup` | Create new author account |
| `GET`  | `/author/login`  | Display login form        |
| `POST` | `/author/login`  | Authenticate author       |
| `GET`  | `/author/logout` | End session & logout      |

#### Article Management

| Method   | Endpoint                     | Description                        |
| -------- | ---------------------------- | ---------------------------------- |
| `GET`    | `/author/home`               | Author dashboard with article list |
| `GET`    | `/author/create-article`     | Display article creation form      |
| `POST`   | `/author/create-article`     | Create new article                 |
| `GET`    | `/author/edit-article/:id`   | Display article editor             |
| `PUT`    | `/author/edit-article/:id`   | Update existing article            |
| `DELETE` | `/author/delete-article/:id` | Delete article                     |

#### Settings & Configuration

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| `GET`  | `/author/settings` | Display blog settings page |
| `PUT`  | `/author/settings` | Update blog information    |

---

## 📜 NPM Scripts

| Command                | Description                                  | Use Case        |
| ---------------------- | -------------------------------------------- | --------------- |
| `npm start`            | Start the application in production mode     | Deployment      |
| `npm run dev`          | Start with nodemon (auto-restart on changes) | Development     |
| `npm run build-db`     | Create database from schema                  | Mac/Linux setup |
| `npm run build-db-win` | Create database from schema                  | Windows setup   |
| `npm run clean-db`     | Delete the database file                     | Mac/Linux reset |
| `npm run clean-db-win` | Delete the database file                     | Windows reset   |

### Script Examples

```bash
# Development workflow
npm run clean-db      # Reset database
npm run build-db      # Rebuild from schema
npm run dev           # Start development server

# Production deployment
npm install           # Install dependencies
npm run build-db      # Initialize database
npm start             # Launch application
```

---

## ⚙️ Configuration

### Environment Setup

#### Session Secret

> ⚠️ **Security Warning:** Change the default session secret before deploying to production!

**Location:** `index.js`

```javascript
app.use(session({
    secret: 'your-secret-key',  // ⚠️ Change this to a secure random string!
    resave: false,
    saveUninitialized: true,
}));
```

**Recommended:** Use a strong, randomly generated secret:

```javascript
// Generate a secure secret:
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

secret: process.env.SESSION_SECRET || 'fallback-secret-for-development'
```

#### Port Configuration

**Default:** `3000`  
**Location:** `index.js`

```javascript
const port = process.env.PORT || 3000;
```

**Change port:**
```bash
# Using environment variable
PORT=8080 npm start

# Or modify index.js directly
const port = 8080;
```

---

## 💡 Usage

### For Authors

1. **Register an Account**
   - Navigate to `/author/signup`
   - Fill in your name, email, and password
   - Click "Sign Up"

2. **Customize Your Blog**
   - Go to Settings after logging in
   - Set your blog title and subtitle
   - Save changes

3. **Create Your First Article**
   - Click "Create New Article" from your dashboard
   - Write your content using the editor
   - Save as draft or publish immediately

4. **Manage Content**
   - View all articles in your dashboard
   - Edit, publish, or delete articles
   - Track views and engagement

### For Readers

1. **Browse Articles**
   - Visit the homepage or `/reader`
   - Browse published articles

2. **Read & Engage**
   - Click on any article to read
   - Leave comments
   - Like articles you enjoy

---

## 🔧 Development

### Dependencies

#### Production Dependencies

| Package           | Version | Purpose                               |
| ----------------- | ------- | ------------------------------------- |
| `express`         | ^4.18.2 | Web application framework             |
| `body-parser`     | ^1.20.2 | Parse incoming request bodies         |
| `ejs`             | ^3.1.8  | Embedded JavaScript templating        |
| `sqlite3`         | ^5.1.2  | SQLite database driver                |
| `express-session` | ^1.18.0 | Session middleware for authentication |
| `method-override` | ^3.0.0  | HTTP verb support (PUT, DELETE)       |
| `date-fns`        | ^3.6.0  | Modern date utility library           |

#### Development Dependencies

| Package   | Version | Purpose                             |
| --------- | ------- | ----------------------------------- |
| `nodemon` | ^3.1.4  | Auto-restart server on file changes |

### Development Guidelines

#### Database Management
```bash
# Always modify schema through db_schema.sql
# Then rebuild the database:
npm run clean-db && npm run build-db
```

**Best Practices:**
- ✅ Modify `db_schema.sql` for schema changes
- ✅ Use npm scripts to rebuild database
- ❌ Don't manually alter database structure
- ❌ Don't commit `database.db` to version control

#### Authentication Flow

The app uses session-based authentication:

```javascript
// middleware/auth.js
module.exports = function isLoggedIn(req, res, next) {
    if (!req.session.author) {
        return res.redirect("/author/login");
    }
    next();
};
```

**Protected Routes:**
- All `/author/*` routes (except signup/login) require authentication
- Session data stored in `req.session.author`
- Automatic redirect to login if not authenticated

#### Code Structure

```javascript
// Standard route pattern
router.get('/endpoint', isLoggedIn, (req, res, next) => {
    const query = 'SELECT * FROM table WHERE condition = ?';
    const parameters = [value];
    
    global.db.get(query, parameters, (err, row) => {
        if (err) return next(err);
        res.render('template', { data: row });
    });
});
```

### Key Features

- **Foreign Key Constraints:** Enabled in SQLite for data integrity
- **Date Formatting:** Consistent formatting via `date-fns`
- **Global Database:** Accessible via `global.db` throughout the app
- **EJS Locals:** `formatDate()` helper available in all views

---

## 🔄 Database Management

### Reset Database

Start fresh with a clean database:

**macOS / Linux:**
```bash
npm run clean-db && npm run build-db
```

**Windows:**
```bash
npm run clean-db-win && npm run build-db-win
```

### Backup Database

```bash
# Create a backup
cp database.db database.backup.db

# Restore from backup
cp database.backup.db database.db
```

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>Port Already in Use</b></summary>

**Error:** `EADDRINUSE: address already in use :::3000`

**Solutions:**
1. Change the port in `index.js`:
   ```javascript
   const port = 8080; // Use different port
   ```
2. Or kill the process using port 3000:
   ```bash
   # Find process ID
   lsof -i :3000
   
   # Kill process
   kill -9 <PID>
   ```

</details>

<details>
<summary><b>Database Connection Error</b></summary>

**Error:** `Error: SQLITE_CANTOPEN: unable to open database file`

**Solutions:**
1. Ensure SQLite3 is installed:
   ```bash
   sqlite3 --version
   ```
2. Rebuild the database:
   ```bash
   npm run build-db
   ```
3. Check file permissions on `database.db`

</details>

<details>
<summary><b>Session Issues</b></summary>

**Symptoms:** Unable to stay logged in, random logouts

**Solutions:**
1. Clear browser cookies and cache
2. Change session secret in `index.js`
3. Restart the server
4. Check if `express-session` is properly installed

</details>

<details>
<summary><b>Module Not Found</b></summary>

**Error:** `Cannot find module 'express'` (or other modules)

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

</details>

<details>
<summary><b>CSS Styles Not Loading</b></summary>

**Solution:**
1. Ensure `public/main.css` exists
2. Check static file middleware in `index.js`:
   ```javascript
   app.use(express.static(__dirname + '/public'));
   ```
3. Clear browser cache (Ctrl+F5 / Cmd+Shift+R)

</details>

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Shields.io](https://shields.io/)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

</div>