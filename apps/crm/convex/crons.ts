import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Agent queue heartbeat: claim due tasks and hand them to the workpool.
crons.interval("agent tick", { minutes: 1 }, internal.agentTasks.tick, {});
// Approved outreach sends are paced by each campaign's daily limit.
crons.interval("outreach send tick", { minutes: 5 }, internal.outreach.sendBatch, {});
crons.interval("outreach reply check", { minutes: 10 }, internal.outreach.checkReplies, {});
// Delivery failures usually arrive immediately after send; check each queue
// cycle so a bounce is handled within roughly five minutes.
crons.interval("outreach bounce check", { minutes: 5 }, internal.outreach.processBounces, {});

export default crons;
