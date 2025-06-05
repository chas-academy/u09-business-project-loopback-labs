[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

# Mimir App

En fullstack webapplikation som använder ett externt API för att hämta och visa data. Projektet bygger på React för frontend och Node.js/Express med MongoDB för backend.

## UX/UI Design

[Figma Design](https://www.figma.com/board/qRIhEzYdTOqM1IFqnVIIko/Mimir?node-id=0-1&t=cqPfkoy9XJRFImvg-1)

## Problem och Syfte

Denna applikation löser problemet att användare vill ha en personlig upplevelse av API-data genom att tillåta användare att:

- Logga in via OAuth
- Söka och visa data från ett externt API
- Spara och hantera personliga listor/data

## Tekniskt

### Frontend

- React
- OAuth-autentisering
- API-integration
- Responsive design
- Mobile-first approach

### Backend

- Node.js/Express
- MongoDB
- CRUD-funktionalitet
- RESTful API

## Installation

### Backend

1. Installera dependencies:

```bash
npm install
```

2. Starta servern:

```bash
npm run dev
```

### Frontend

1. Installera dependencies:

```bash
npm install
```

2. Starta frontend:

```bash
npm start
```

## Dokumentation

### Projektstruktur

```
mimir-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

### Miljövariabler

Backend:

- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5001)
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret

Frontend:

- `VITE_API_URL` - Backend API URL
- `VITE_GITHUB_CLIENT_ID` - GitHub OAuth client ID

### API Endpoints

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### OAuth Flow

1. User clicks login button
2. Redirected to GitHub OAuth page
3. After authentication, redirected back to app
4. User is logged in with access token
5. Access token used for API requests

### Error Handling

- 401 Unauthorized - Invalid or expired token
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error

### Deployment

The application is deployed using Netlify for frontend and Heroku for backend.

### Testing

The application includes unit tests for both frontend and backend components.

### Support

For support or questions, please contact the development team.

### Projektmedlemmar

- Joakim Helgodt
