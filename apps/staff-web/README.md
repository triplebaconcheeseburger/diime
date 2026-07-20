# @diime/staff-web

Placeholder for the shop-staff pickup verification web app.

Not yet scaffolded. Purpose: a lightweight, mobile-web tool (no install required) for partner-shop staff to log in (scoped to their shop), see a pending-pickup queue, scan a customer's order barcode/QR, verify it's paid/unfulfilled/theirs, and mark it fulfilled — decrementing consigned stock and feeding the per-shop settlement report.

Planned stack: a minimal Vite + React + TypeScript app (deliberately light — this is an internal tool, not a marketing surface), a camera-based JS barcode-scanning library, talking to `services/api` for order lookup/verification.
