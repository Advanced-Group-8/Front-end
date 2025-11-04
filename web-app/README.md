# Chas Advanced Grupp 8 – Web App

Detta är frontend-applikationen för Chas Advanced Grupp 8:s logistiksystem.  
Projektet är byggt med **React**, **Redux Toolkit**, **TypeScript**, **Vite** och **Tailwind CSS**.

## Innehåll

- [Kom igång](#kom-igång)
- [Tillgängliga scripts](#tillgängliga-scripts)
- [Projektstruktur](#projektstruktur)
- [Roller och åtkomst](#roller-och-åtkomst)
- [Miljövariabler](#miljövariabler)
- [API](#api)
- [Kontakt](#kontakt)
- [Docker](#docker)

---

## Kom igång

1. **Kopiera repo och installera beroenden:**

   ```bash
   git clone <repo-url>
   cd web-app
   npm install
   ```

2. **Skapa `.env`-fil:**

   - Kopiera `.env.EXAMPLE` till `.env` och fyll i API-url mm.

3. **Starta utvecklingsserver:**

   ```bash
   npm run dev
   ```

4. **Öppna i webbläsare:**
   - Gå till [http://localhost:5173](http://localhost:5173)

---

## Tillgängliga scripts

| Script            | Beskrivning               |
| ----------------- | ------------------------- |
| `npm run dev`     | Startar utvecklingsserver |
| `npm run build`   | Bygger produktion         |
| `npm run preview` | Förhandsvisar produktion  |
| `npm run lint`    | Kör ESLint-kontroller     |

---

## Projektstruktur

```
src/
  api/             # API-anrop och mockdata
  assets/          # Bilder, ikoner, SVG
  components/      # Återanvändbara komponenter
  hooks/           # Custom React hooks
  layout/          # Layout-komponenter (t.ex. navbar, footer, rollbaserad layout)
  pages/           # Sidor (SignIn, SignUp, Dashboards, Orders, etc)
  router/          # Routing och RoleGuard
  store/           # Redux slices och store
  types/           # TypeScript-typer
  index.css        # Tailwind CSS
  main.tsx         # App entrypoint
```

---

## Roller och åtkomst

Appen har fyra roller:

- **sender**
- **receiver**
- **carrier**
- **admin**

Åtkomst till vissa sidor styrs av roll, t.ex. med `RoleGuard` i router.  
Varje roll får sin egen dashboard/startsida.

---

## Miljövariabler

### Utveckling

Lägg till en `.env`-fil i projektroten. Exempel:

```
VITE_API_BASE_URL=https://din-backend-url/api
```

### Produktion/Docker

För runtime-miljövariabler används `public/env.js` och ett entrypoint-script i Docker.  
Exempel på `env.js`:

```js
window.env = {
  VITE_API_BASE_URL: "https://din-backend-url/api",
};
```

Vid Docker-start kan du ange API-url så här:

```bash
docker run -e VITE_API_BASE_URL=https://din-backend-url/api -p 8080:80 chas-web-app
```

---

## API

- Autentisering sker mot `/auth/sign-in` (POST) och `/auth/me` (GET).
- Efter inloggning sparas JWT-token i `localStorage` och profil laddas automatiskt.
- Se `src/api/` för detaljer om API-anrop.

---

## Docker

### Bygg och kör containern:

```bash
docker build -t chas-web-app .
docker run -e VITE_API_BASE_URL=https://din-backend-url/api -p 8080:80 chas-web-app
```

### Miljövariabler i Docker

- Vid build kopieras `public/env.js` till Nginx-mappen.
- Vid containerstart ersätter `docker-entrypoint.sh` värdet i `env.js` med det du skickar in via `VITE_API_BASE_URL`.
- Frontend läser alltid API-url från `window.env.VITE_API_BASE_URL`.

---

## Kontakt

Vid frågor, kontakta projektgruppen eller ansvarig handledare.

---
