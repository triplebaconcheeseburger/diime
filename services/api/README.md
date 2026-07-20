# @diime/api

Placeholder for the diime application backend.

Not yet scaffolded. Owns everything Sanity can't do statelessly: auth/session, subscription entitlement checks (RevenueCat webhooks), server-enforced open-hours gating, RSVP/check-in state, push notification scheduling, deep-link resolution, consigned inventory + fulfillment + per-shop settlement reporting, and Shopify order-webhook ingestion.

Planned stack: Fastify or NestJS + TypeScript, Postgres. See the project plan doc (§1, §2, §4) for the full data-model and endpoint responsibilities.
