import { cronJobs } from "convex/server";

const crons = cronJobs();

// Production work is event-driven. User actions schedule the exact work they
// create, so an idle CRM performs no periodic database or Gmail polling.

export default crons;
