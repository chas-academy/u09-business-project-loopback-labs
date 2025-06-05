[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

# Mimir App

En webapplikation för att hitta och hantera recept. Projektet bygger på React för frontend och Node.js/Express för backend.

## UX/UI Design

[Figma Design](https://www.figma.com/board/qRIhEzYdTOqM1IFqnVIIko/Mimir?node-id=0-1&t=cqPfkoy9XJRFImvg-1)

## Problem och Syfte

Många människor har svårt för att:
- Hitta nya recept som passar deras smak och behov
- Hålla koll på favoritrecept
- Organisera recept på ett användarvänligt sätt
- Hitta recept snabbt när de behöver dem

Mimir App löser detta genom att:
- Tillåta användare att söka genom tusentals recept
- Göra det möjligt att spara favoritrecept
- Visa detaljerad information om varje recept
- Ge en användarvänlig upplevelse för att hitta och organisera recept

## Tekniskt

### Frontend

- React
- OAuth-autentisering med GitHub
- Integration med Spoonacular API
- Responsive design
- Modern och intuitiv användargränssnitt

### Backend

- Node.js/Express
- RESTful API
- Autentisering och användarhantering
- Recepthantering och lagring

## Deployment

Frontend: https://mimir1.netlify.app/
Backend: https://u09-business-project-loopback-labs.onrender.com

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

- `PORT` - Server port (default: 5001)
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret

Frontend:

- `VITE_API_URL` - Backend API URL
- `VITE_GITHUB_CLIENT_ID` - GitHub OAuth client ID

### API Endpoints

- `GET /api/recipes` - Hämta alla sparade recept
- `GET /api/recipes/:id` - Hämta detaljer för ett recept
- `POST /api/recipes` - Spara ett nytt recept
- `DELETE /api/recipes/:id` - Ta bort ett recept

### OAuth Flow

1. Användare klickar på inloggningsknappen
2. Omdirigeras till GitHub OAuth-sidan
3. Efter autentisering omdirigeras användaren tillbaka till appen
4. Användaren är inloggad och kan använda appen

### Error Handling

- 401 Unauthorized - Ogiltigt eller utgått token
- 404 Not Found - Resurs hittades inte
- 500 Internal Server Error - Serverfel

### Testing

The application includes unit tests for both frontend and backend components.

### Support

For support or questions, please contact the development team.

### Projektmedlemmar

- Joakim Helgodt
