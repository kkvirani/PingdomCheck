# PingdomCheck Dashboard

Beautiful dashboard to view your Pingdom checks. This project contains a simple Express proxy server and a Vite + React frontend.

Features:

- Fetches checks from Pingdom via a server-side proxied API to keep your API token secure
- Clean, responsive UI with status chips and search

Quick start

1. Copy `.env.example` to `.env` and fill PINGDOM_TOKEN.
2. Install dependencies:

   # From the repo root you can install both with a single command:

   npm run setup

3. Start the app (single command):

   npm run dev

This will start the server at port 3000 and the client (Vite) dev server; the client is proxied so API calls to `/api` go to the server.

4. Open the client URL shown by Vite (usually http://localhost:5173)

I can also push this repo to GitHub if you provide a token or allow me to open a browser to authenticate.
