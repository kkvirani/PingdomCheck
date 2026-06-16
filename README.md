# PingdomCheck Dashboard

Beautiful dashboard to view your Pingdom checks. This project contains a simple Express proxy server and a Vite + React frontend.

Features:
- Fetches checks from Pingdom via a server-side proxied API to keep your API token secure
- Clean, responsive UI with status chips and search

Quick start

1. Copy `.env.example` to `.env` and fill PINGDOM_TOKEN.
2. Install dependencies:

   cd server; npm install
   cd ../client; npm install

3. Run both servers in separate terminals:

   cd server; npm run dev
   cd ../client; npm run dev

4. Open the client URL shown by Vite (usually http://localhost:5173)

I can also push this repo to GitHub if you provide a token or allow me to open a browser to authenticate.