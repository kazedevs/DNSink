# DNSink

DNSink is a lightweight, self-hosted DNS-level tracker and ad blocker. It intercepts and blocks unwanted domains (such as ads and trackers) at the DNS level before they reach your devices.

## Features

- **DNS Server**: Custom DNS server listening on UDP port `5333` that resolves queries using upstream servers (e.g., `1.1.1.1`) and sinks blocked domains.
- **High-Performance Filtering**: Loads blocklists from `blocklist.txt` and performs instant matching.
- **Persistent Logging**: Stores query history (allowed and blocked events) in a local SQLite database (`queries.db`).
- **Real-Time Updates**: Broadcasts live DNS queries via WebSocket server (port `8080`).
- **Modern Dashboard**: A React-based web dashboard displaying overall query counts, block rate, top blocked domains, and a live query feed.

## Dashboard Screenshot

![DNSink Dashboard](/server/demoss.png)

## Getting Started

### Prerequisites

- Node.js (v18+)

### Installation & Run

1. **Install Root Dependencies & Start Backend**:
   ```bash
   npm install
   npm start
   ```
   *This initializes the SQLite database, starts the DNS server on port 5333, and runs the web server on port 3001.*

2. **Start Dashboard**:
   ```bash
   cd dashboard
   npm install
   npm run dev
   ```
   *Open the URL shown (typically `http://localhost:5173`) in your browser to view the dashboard.*
