import type {
  CTAContent,
  QuestionAnswer,
  RelatedLink,
  ServicePageContent,
} from "@/components/landing/types";

export const roofingHubPath = "/roofing";

const roofingParent = { path: roofingHubPath, label: "Roofing" };

const roofingCta: CTAContent = {
  headlineLine1: "Find the leak",
  headlineLine2: "closest to booked roofs.",
  description:
    "Book a free revenue leak assessment. We will walk through how calls, web leads, estimates, and storm surges move through your office today and name the first workflow worth fixing.",
  ctaLabel: "Get my free assessment",
  videoSrc: "/videos/cta-background-operations.mp4",
};

function roofingFaq(items: QuestionAnswer[]) {
  return {
    eyebrow: "FAQ",
    headline: "Questions roofing owners ask us.",
    helperText: "Want to talk it through with a person?",
    helperLinkLabel: "Contact NewRevGen",
    items,
  };
}

const relatedLinks = {
  hub: {
    href: roofingHubPath,
    label: "All roofing pages",
    description: "Every NewRevGen page for owner-led roofing companies.",
  },
  ai: {
    href: "/roofing/ai-for-roofing-contractors",
    label: "AI for roofing contractors",
    description: "How AI answers calls, replies to leads, and keeps estimates moving.",
  },
  missedCalls: {
    href: "/roofing/missed-call-recovery",
    label: "Missed-call recovery for roofers",
    description: "Text-back, call capture, and callbacks for calls nobody could answer.",
  },
  estimates: {
    href: "/roofing/estimate-follow-up",
    label: "Estimate follow-up for roofers",
    description: "A steady follow-up process for every open roofing estimate.",
  },
  storms: {
    href: "/roofing/storm-lead-response",
    label: "Storm lead response for roofers",
    description: "Intake, triage, and updates when hail or wind brings a surge of leads.",
  },
  missedCallTool: {
    href: "/tools/missed-call-calculator",
    label: "Missed-Call Revenue Calculator",
    description: "Model what unanswered calls may be costing you, using your own numbers.",
  },
  estimateTool: {
    href: "/tools/estimate-follow-up-gap",
    label: "Estimate Follow-Up Gap Check",
    description: "See how much value is sitting in open estimates and how consistent follow-up is.",
  },
  operations: {
    href: "/operations",
    label: "Contractors and service businesses",
    description: "Our systems for HVAC, plumbing, electrical, remodeling, and other trades.",
  },
} satisfies Record<string, RelatedLink>;

export const aiForRoofingContent: ServicePageContent = {
  path: "/roofing/ai-for-roofing-contractors",
  meta: {
    title: "AI for Roofing Contractors | NewRevGen",
    description:
      "How owner-led roofing companies use AI to answer missed calls, reply to leads right away, and follow up on estimates, built on the tools they already use.",
  },
  breadcrumbLabel: "AI for roofing contractors",
  parent: roofingParent,
  eyebrow: "For owner-led roofing companies",
  h1: "AI for roofing contractors",
  intro:
    "NewRevGen sets up practical AI and automation for owner-led roofing companies. That means answering or texting back calls you miss, replying to website and Google leads right away, following up on open estimates, and keeping your CRM current. We build on the phone system, forms, and CRM you already use, and you approve what goes out to homeowners.",
  quickAnswers: [
    {
      q: "What is AI for a roofing contractor?",
      a: "AI for a roofing contractor is software that handles the repeatable office work between a homeowner reaching out and a signed contract. In practice that means answering or texting back missed calls, replying to web and Google form leads right away, collecting job details, booking inspections, and following up on estimates until the homeowner gives an answer. It supports your team. It does not replace the person who inspects the roof or sells the job.",
    },
    {
      q: "What AI tools help owner-led roofing companies respond to leads faster?",
      a: "The tools that help most act the moment a lead arrives: missed-call text-back, an AI receptionist for after-hours and on-the-roof calls, instant replies to website and Google form leads, and automatic routing to whoever can book the inspection. They work best when they all write into one CRM, so no lead lives only in a voicemail or an inbox.",
    },
    {
      q: "Can AI answer the phone for a roofing company after hours and during jobs?",
      a: "Yes. An AI receptionist can answer when nobody can pick up, collect the caller's name, address, and what is happening with the roof, flag active leaks as urgent, and either book a time or hand the details to your team. You decide what it is allowed to say and when it should pass the call to a person.",
    },
    {
      q: "Who builds AI systems for small roofing contractors that miss calls and slow-follow estimates?",
      a: "NewRevGen does. We are an AI automation agency that works with owner-led contractors, including roofing companies. We start with one leak, usually missed calls or estimate follow-up, set it up on your current tools, and measure whether it helps book more work before adding anything else.",
    },
  ],
  sections: [
    {
      heading: "Where roofing companies lose jobs after the lead comes in",
      paragraphs: [
        "Busy roofing companies rarely lose work because nobody called. They lose it in the gaps between the call and the contract. Each gap looks small on its own. Together they decide how much of the demand you already paid to generate actually turns into booked roofs.",
      ],
      bullets: [
        "Calls that ring out while you are on a roof or driving between jobs.",
        "Website and Google form leads that wait hours for a reply.",
        "Estimates that are sent once and never followed up.",
        "Storm surges that bury urgent leaks under routine requests.",
        "Follow-up that only happens when the owner remembers to do it.",
      ],
    },
    {
      heading: "How to stop being the only person who can sell and follow up",
      paragraphs: [
        "In many owner-led roofing companies, the owner is the phone, the estimator, and the follow-up system. That works until the business grows or the owner is up on a roof all day.",
        "The fix is to write down the steps you already follow in your head, then let a system run the repeatable ones: the first reply, the reminder texts, the next-step questions, and the alert when a homeowner is ready to talk. You and your team still handle the conversations that need judgment, like pricing, scope, and insurance questions.",
      ],
    },
    {
      heading: "Getting website and Google form leads into automatic follow-up",
      paragraphs: [
        "Every lead source should land in one place. We connect your website forms, Google and other form leads where the platform allows it, and your phone system to your CRM. Each new lead gets an immediate acknowledgment, a few short qualifying questions, and an assigned person on your team. If nobody has followed up by the time you set, the system reminds the right person, then the owner.",
      ],
    },
    {
      heading: "What to ask before you buy an AI answering or lead follow-up tool",
      paragraphs: [
        "A demo shows a tool on a good day. These questions show how it behaves on a busy one.",
      ],
      bullets: [
        "Does it write every call, text, and lead into the CRM we already use, or into its own separate inbox?",
        "Can we control exactly what it says, and can we see a log of every message it sent?",
        "How does it handle an active leak or an upset homeowner, and when does it hand off to a person?",
        "What happens to after-hours calls and to calls that come in while the crew is on a roof?",
        "Who owns the phone numbers, the data, and the message history if we stop using it?",
        "How does it handle opt-outs and texting consent?",
        "How will we know it is working, and which numbers will we review?",
      ],
      closing: "If a vendor cannot answer these plainly, keep looking.",
    },
  ],
  setup: {
    heading: "What NewRevGen sets up for roofing companies",
    intro:
      "We start with the leak closest to revenue and add pieces only after the first one is working.",
    items: [
      {
        title: "Missed-call text-back",
        text: "An immediate text to anyone whose call you miss, with simple questions to capture the address and the problem.",
      },
      {
        title: "AI receptionist",
        text: "After-hours and on-the-job call answering that collects details, flags urgent leaks, and books or routes the call.",
      },
      {
        title: "Instant lead response",
        text: "Website, Google, and other form leads get a reply right away and land in one CRM with an owner assigned.",
      },
      {
        title: "Estimate follow-up",
        text: "A follow-up schedule for every open estimate, with reminders for your team and a clear record of where each job stands.",
      },
      {
        title: "Storm surge intake",
        text: "Triage for high-volume weeks so urgent leaks are seen first and every homeowner hears back.",
      },
      {
        title: "Owner dashboard",
        text: "A simple daily view of new leads, response speed, open estimates, and booked jobs.",
      },
    ],
    approvalNote:
      "You approve every message template before it goes live. Bulk messages, such as reopening old estimates, go out only after you review the list.",
  },
  related: [
    relatedLinks.missedCalls,
    relatedLinks.estimates,
    relatedLinks.storms,
    relatedLinks.missedCallTool,
    relatedLinks.estimateTool,
    relatedLinks.operations,
  ],
  faq: roofingFaq([
    {
      q: "What questions should a roofing owner ask before buying an AI answering or lead follow-up tool?",
      a: "Ask whether it writes into your current CRM, how you control and review what it says, how it handles urgent leaks and hand-offs to a person, who owns the phone numbers and message history, how it handles opt-outs, and how you will measure whether it is working.",
    },
    {
      q: "Do I need to switch CRMs to use this?",
      a: "Usually not. We build on the CRM, phone system, and forms you already have when they allow it. If a tool cannot connect, we tell you plainly and suggest the simplest workable option.",
    },
    {
      q: "Will AI replace my office manager or estimator?",
      a: "No. It takes over the repetitive chase work, like first replies, reminders, and status updates, so your people spend their time on inspections, estimates, and conversations that need judgment.",
    },
    {
      q: "Will homeowners know they are talking to an automated system?",
      a: "They should. We write messages that are clear about what is automated and make it easy to reach a person.",
    },
    {
      q: "How do we get started?",
      a: "With a free revenue leak assessment. We walk through how calls, leads, and estimates move through your company today, pick one workflow to fix first, and agree on how we will measure it.",
    },
    {
      q: "Do you only work with roofing companies?",
      a: "No. Roofing is a main focus, and we also work with HVAC, plumbing, electrical, remodeling, and other owner-led contractors.",
    },
  ]),
  cta: roofingCta,
  service: {
    name: "AI systems for roofing contractors",
    serviceType: "AI automation for roofing contractors",
    description:
      "NewRevGen sets up missed-call text-back, AI call answering, instant lead response, estimate follow-up, and storm intake for owner-led roofing companies, built on their existing phone system and CRM with owner approval of customer-facing messages.",
    audience: "Owner-led roofing contractors",
  },
};

export const missedCallRecoveryContent: ServicePageContent = {
  path: "/roofing/missed-call-recovery",
  meta: {
    title: "Missed-Call Text-Back and Recovery for Roofers | NewRevGen",
    description:
      "What to do when your roofing company misses a homeowner's call, how to set up missed-call text-back, and what NewRevGen builds so every caller hears back.",
  },
  breadcrumbLabel: "Missed-call recovery",
  parent: roofingParent,
  eyebrow: "Roofing · Missed calls",
  h1: "Missed-call recovery for roofing companies",
  intro:
    "Missed-call recovery makes sure a homeowner who calls your roofing company and does not reach anyone still hears back right away. NewRevGen sets up the text-back, the call capture, and the callback reminders, so a missed call turns into a conversation instead of a voicemail nobody returns.",
  quickAnswers: [
    {
      q: "What is missed-call text-back for a roofing company?",
      a: "Missed-call text-back is an automatic text sent to a caller when your team cannot answer. It tells the homeowner you saw the call, asks what they need, and gives them an easy way to share the address, the problem, and a good time to talk. Their reply lands in your CRM so a specific person can follow up.",
    },
    {
      q: "What should my roofing company do when we miss a phone call from a homeowner?",
      a: "Reply fast, in writing, and make the next step easy. Send a text right away acknowledging the call, ask whether it is about a leak, storm damage, or an estimate, capture the address, and assign the callback to a specific person. Then make sure the callback actually happens and gets logged.",
    },
    {
      q: "What should happen in the first hour after a homeowner reports a roof leak and we cannot take the call?",
      a: "The homeowner should get a text confirming you received the call, a few short questions about where the water is coming in, a request for photos if they can take them safely, and a clear statement of when someone will call back. The lead should be flagged urgent and sent to whoever handles emergency calls, with a reminder if nobody responds.",
    },
    {
      q: "How do I figure out what missed calls may be costing my roofing business?",
      a: "Start with your phone system's call log. Count the calls you did not answer in a typical month, estimate how many of those were new homeowners rather than vendors or existing customers, then apply your usual booking rate and average job value. Our free Missed-Call Revenue Calculator walks through that math with your own numbers.",
    },
  ],
  sections: [
    {
      heading: "Why missed calls hit roofing companies hard",
      paragraphs: [
        "Roofing calls often come in when nobody can answer: the owner is on a roof, the crew is in the middle of a tear-off, the office is on another line, or it is after hours. A homeowner with a leak or storm damage has a problem today and other roofers to call. A voicemail returned the next morning may be too late.",
      ],
    },
    {
      heading: "How to set up missed-call text-back for a roofing company",
      paragraphs: [
        "Missed-call text-back is one of the simplest systems to put in place, and the details decide whether it helps.",
      ],
      steps: [
        "Check your phone system. Many business phone systems and call-tracking tools can trigger a text when a call is missed. If yours cannot, there are ways to add it without changing the number homeowners already know.",
        "Write the first text. Keep it short, say who you are, and ask one question: is this about a leak, storm damage, or an estimate?",
        "Capture the details. Ask for the property address, a short description, and photos if they are easy to send.",
        "Route it. Send urgent leaks to whoever handles emergencies and routine requests to whoever books inspections.",
        "Log it. Every missed call and every reply should appear in your CRM with an owner and a next step.",
        "Set a backstop. If nobody has called back by the time you choose, the system reminds the assigned person and then the owner.",
        "Handle opt-outs. Anyone who replies stop should stop getting texts.",
      ],
    },
    {
      heading: "Missed-call text-back or an AI receptionist?",
      paragraphs: [
        "Text-back is the simplest starting point. It reacts after a call is missed. An AI receptionist answers the call itself, collects details by voice, and can book a time.",
        "A practical path is to start with text-back, make sure callbacks happen reliably, then add an AI receptionist for after-hours calls or busy stretches once the follow-up process is working.",
      ],
    },
  ],
  setup: {
    heading: "What NewRevGen sets up for missed calls",
    intro:
      "We build on your current phone number and CRM wherever possible, then test the whole path from missed call to logged callback.",
    items: [
      {
        title: "Text-back on your current number",
        text: "An immediate, plain-language text to every caller you could not answer.",
      },
      {
        title: "Urgent leak flagging",
        text: "Replies that mention active leaks or water inside are marked urgent and routed first.",
      },
      {
        title: "Callback reminders",
        text: "Each missed call gets an owner, and reminders escalate if the callback does not happen.",
      },
      {
        title: "AI receptionist (optional)",
        text: "Live answering for after-hours and on-the-roof calls that collects details and books or routes the call.",
      },
      {
        title: "CRM logging",
        text: "Every missed call, text, and reply is recorded against the homeowner in your CRM.",
      },
      {
        title: "Missed-call report",
        text: "A simple view of missed calls and how each one was handled.",
      },
    ],
    approvalNote:
      "You approve the wording of every automated text before it goes live, and you can change it at any time.",
  },
  related: [
    relatedLinks.missedCallTool,
    relatedLinks.storms,
    relatedLinks.estimates,
    relatedLinks.ai,
    relatedLinks.hub,
    relatedLinks.operations,
  ],
  faq: roofingFaq([
    {
      q: "What should I look for in an AI receptionist or missed-call system for a roofing company?",
      a: "Look for a system that works with your current phone number, writes every call and text into your CRM, lets you control the wording, flags urgent leaks, hands off to a person cleanly, handles opt-outs, and gives you a log you can review.",
    },
    {
      q: "Do I need a new phone number?",
      a: "Usually not. We start with your existing number and phone system where possible. If your system cannot trigger texts, we explain the options before changing anything.",
    },
    {
      q: "Will the text sound robotic?",
      a: "It sounds like your company because you approve the wording. We keep it short, plain, and specific to roofing.",
    },
    {
      q: "What about after-hours calls?",
      a: "After-hours callers get the same immediate text, and an AI receptionist can be added to answer them live. Urgent leaks can be routed to an on-call person if you have one.",
    },
    {
      q: "Is it okay to text homeowners who called us?",
      a: "Texting rules vary, so we keep these messages limited to people who contacted you first, include opt-out handling, and recommend confirming your obligations with your phone provider or counsel.",
    },
    {
      q: "How do I know if missed-call recovery is working?",
      a: "Track how many calls were missed, how many got a text, how many replied, and how many turned into inspections. We set up that view so you can see it without digging through call logs.",
    },
  ]),
  cta: roofingCta,
  service: {
    name: "Missed-call recovery for roofing companies",
    serviceType: "Missed-call text-back and call capture",
    description:
      "NewRevGen sets up missed-call text-back, urgent leak routing, callback reminders, optional AI call answering, and CRM logging for roofing companies, using their existing phone number where possible.",
    audience: "Owner-led roofing contractors",
  },
};

export const estimateFollowUpContent: ServicePageContent = {
  path: "/roofing/estimate-follow-up",
  meta: {
    title: "Estimate Follow-Up for Roofing Contractors | NewRevGen",
    description:
      "How a roofer should follow up on estimates that did not close, how quickly to respond, and how NewRevGen automates follow-up in the CRM you already use.",
  },
  breadcrumbLabel: "Estimate follow-up",
  parent: roofingParent,
  eyebrow: "Roofing · Estimates",
  h1: "Estimate follow-up for roofers",
  intro:
    "Estimate follow-up is the process of checking back with a homeowner after you send a roofing estimate until they sign, decline, or tell you to wait. NewRevGen sets up a consistent follow-up system in your current CRM, so open estimates get attention without the owner having to remember every one.",
  quickAnswers: [
    {
      q: "What is estimate follow-up for a roofing company?",
      a: "Estimate follow-up is the planned set of calls, texts, and emails a roofing company sends after an estimate goes out. Good follow-up answers questions, keeps the job on the homeowner's radar, and records the outcome, so you always know which estimates are still open and why.",
    },
    {
      q: "How should a roofing contractor follow up on estimates that did not close?",
      a: "Check in soon after the estimate is delivered to confirm it arrived and offer to walk through it. Follow up again on a set schedule with something useful each time, such as answers to common questions, material options, or scheduling availability. Ask directly whether they have decided, and record the reason when they say no. Move homeowners who chose to wait to a slower check-in list.",
    },
    {
      q: "How quickly should a roofing company follow up after a homeowner requests an estimate?",
      a: "Right away. An immediate reply should confirm the request and offer inspection times, and a person should follow up the same business day. Speed matters most at the start, when the homeowner is actively looking and may be calling other roofers.",
    },
    {
      q: "Can AI help a roofing company follow up on estimates that sit unsigned?",
      a: "Yes. AI can send follow-ups on a schedule, answer common questions, notice when a homeowner replies with interest, and alert your team to call. It can also sort old unsigned estimates so you can see which are worth reopening. You approve the messages and any bulk outreach.",
    },
  ],
  sections: [
    {
      heading: "Why roofing estimates go quiet",
      paragraphs: [
        "Estimates usually go quiet for ordinary reasons. The homeowner is waiting on an insurance decision, comparing bids, talking it over at home, or simply busy. Without a follow-up process, the estimate sits in a folder until the homeowner hires someone else or forgets. Steady, helpful follow-up keeps you in the conversation without being pushy.",
      ],
    },
    {
      heading: "Using your CRM to follow up after an inspection or estimate",
      paragraphs: [
        "A CRM only helps if every job has a clear status. Set up stages that match how roofing is actually sold, then let each stage trigger the right next step automatically, such as a reminder, a text, or a task for the estimator. When an estimate is marked lost, capture the reason so you can spot patterns over time.",
      ],
      bullets: [
        "Inspection scheduled",
        "Inspection complete",
        "Estimate sent",
        "Follow-up in progress",
        "Waiting on insurance",
        "Signed",
        "Lost, with a reason",
      ],
    },
    {
      heading: "A simple follow-up cadence you can adapt",
      paragraphs: [
        "The exact timing should fit your market and season. What matters is that every estimate gets the same steady attention.",
      ],
      steps: [
        "When the estimate is sent: confirm it arrived and offer to walk through it.",
        "A few days later: answer the questions homeowners usually ask, such as timeline, materials, warranty, and financing if you offer it.",
        "About a week later: ask directly whether they have decided and what would help them decide.",
        "After that: move quiet estimates to a slower check-in list, and stop as soon as they ask you to.",
      ],
    },
    {
      heading: "Reopening old unsigned estimates",
      paragraphs: [
        "Many roofing companies have a backlog of old unsigned estimates. A short, honest check-in can surface homeowners who still need the work. We clean the list, remove anyone who declined or asked not to be contacted, and you review it before anything goes out.",
      ],
    },
  ],
  setup: {
    heading: "What NewRevGen sets up for estimate follow-up",
    intro:
      "We configure the follow-up around how your company already sells, in the CRM you already pay for when it allows it.",
    items: [
      {
        title: "Estimate stages",
        text: "CRM stages that match how roofing jobs move, from inspection to signed or lost.",
      },
      {
        title: "Scheduled follow-up",
        text: "Automated texts and emails on a schedule you approve, with stop rules built in.",
      },
      {
        title: "Reply alerts",
        text: "Your team is alerted when a homeowner replies, asks a question, or is ready to talk.",
      },
      {
        title: "Lost-reason tracking",
        text: "A simple record of why estimates did not close, so you can see patterns.",
      },
      {
        title: "Old-estimate reactivation",
        text: "A cleaned list of old unsigned estimates, reviewed by you before any message is sent.",
      },
      {
        title: "Open-estimate view",
        text: "One place for the owner to see every open estimate, its age, and its next step.",
      },
    ],
    approvalNote:
      "You approve the follow-up messages and schedule. Bulk reactivation messages go out only after you review the list.",
  },
  related: [
    relatedLinks.estimateTool,
    relatedLinks.missedCalls,
    relatedLinks.storms,
    relatedLinks.ai,
    relatedLinks.hub,
    relatedLinks.operations,
  ],
  faq: roofingFaq([
    {
      q: "How many times should a roofer follow up on an estimate?",
      a: "Keep following up until the homeowner signs, declines, or asks you to stop, and make each touch useful. A set schedule matters more than an exact count, because it means no estimate depends on someone remembering it.",
    },
    {
      q: "Should estimate follow-up be by text, email, or phone?",
      a: "Use a mix. Texts are quick for confirmations and short questions, email works for the estimate and its details, and a phone call is best when the homeowner shows interest or has questions. The system can handle routine texts and emails and tell your team when to call.",
    },
    {
      q: "What about homeowners waiting on an insurance decision?",
      a: "Mark those estimates as waiting on insurance and check in on a slower schedule about where things stand. We do not give insurance advice. The goal is to stay in touch so you are ready when they are.",
    },
    {
      q: "Will automated follow-up annoy homeowners?",
      a: "Not if it is spaced out, relevant, and easy to stop. Every message should offer something useful or ask a clear question, and anyone who asks to stop is removed right away.",
    },
    {
      q: "What should a contractor look for in a CRM follow-up system for estimate leads?",
      a: "Look for clear estimate stages, follow-up that runs on a schedule without someone starting it by hand, alerts when a customer replies, a record of why jobs were lost, and a simple view of every open estimate with its next step.",
    },
    {
      q: "Do I need a new CRM?",
      a: "Usually not. We set up follow-up in the CRM you already use when it allows it. If it cannot support what you need, we explain the tradeoffs before recommending a change.",
    },
  ]),
  cta: roofingCta,
  service: {
    name: "Estimate follow-up for roofing contractors",
    serviceType: "Estimate follow-up automation",
    description:
      "NewRevGen sets up estimate stages, scheduled follow-up texts and emails, reply alerts, lost-reason tracking, and owner-reviewed reactivation of old estimates for roofing contractors in their existing CRM.",
    audience: "Owner-led roofing contractors",
  },
};

export const stormLeadResponseContent: ServicePageContent = {
  path: "/roofing/storm-lead-response",
  meta: {
    title: "Storm Lead Response for Roofing Companies | NewRevGen",
    description:
      "How a roofing company should handle a surge of storm leads after hail or wind damage, and the intake, triage, and follow-up system NewRevGen sets up for it.",
  },
  breadcrumbLabel: "Storm lead response",
  parent: roofingParent,
  eyebrow: "Roofing · Storm leads",
  h1: "Storm lead response for roofers",
  intro:
    "Storm lead response is how a roofing company handles the surge of calls, forms, and messages that follows hail or wind damage. NewRevGen sets up intake, triage, and follow-up so every homeowner hears back, active leaks get seen first, and nothing gets lost when volume spikes.",
  quickAnswers: [
    {
      q: "What is storm lead response?",
      a: "Storm lead response is the process a roofing company uses to acknowledge, sort, schedule, and follow up with the burst of homeowner requests that comes after a hail or wind event. It covers the first reply, triage of urgent leaks, inspection scheduling, status updates, and follow-up on the estimates that come out of those inspections.",
    },
    {
      q: "How should a roofing company handle a surge of storm leads after hail or wind damage?",
      a: "Acknowledge every request right away, sort by urgency, and be honest about timing. Active leaks and safety concerns go to the front. Everyone else gets a clear message about when you expect to inspect, a way to send photos and details, and an update if the schedule changes. Keep every lead in one list so nothing is lost when calls, forms, and texts all arrive at once.",
    },
    {
      q: "What information should a roofer collect from a storm lead?",
      a: "Collect the property address, the homeowner's name and best contact method, what damage they can see, whether water is coming inside, whether they have filed or plan to file an insurance claim, and photos if they can take them safely. That is enough to triage and schedule without a long phone call.",
    },
    {
      q: "Can AI help a roofing company with storm leads?",
      a: "Yes. AI can answer and text back while your phones are overloaded, collect the details above, sort requests by urgency, and send status updates. Your team stays in charge of scheduling decisions, inspections, and anything involving an insurance claim.",
    },
  ],
  sections: [
    {
      heading: "Why storm surges break normal processes",
      paragraphs: [
        "On a normal week, a roofing office can return calls by hand. After a storm, requests can arrive faster than anyone can return them, right when the owner and estimators are out inspecting. Voicemails pile up, the same homeowner calls more than once, urgent leaks get buried under routine requests, and web form leads wait the longest.",
      ],
    },
    {
      heading: "A storm response plan, step by step",
      paragraphs: [
        "A good storm process is mostly decided before the storm. These are the steps we set up.",
      ],
      steps: [
        "Acknowledge immediately. Every call, form, and text gets a reply confirming you received it.",
        "Collect details up front. Address, damage description, whether water is coming inside, insurance status, and photos.",
        "Triage. Active leaks and safety concerns go to the top. Routine inspection requests go into a scheduling queue.",
        "Schedule by area. Group inspections by neighborhood to reduce drive time between stops.",
        "Keep homeowners updated. Send honest status messages when timing changes, so they do not have to call to ask.",
        "Follow up on every estimate. Storm estimates feed into the same estimate follow-up process as the rest of your work.",
      ],
    },
    {
      heading: "Set it up before the next storm",
      paragraphs: [
        "The best time to build storm response is during a calm stretch. Message templates, triage rules, routing, and the scheduling queue can all be ready and tested, so you can switch them on the day a storm comes through.",
      ],
    },
    {
      heading: "What we do not do",
      paragraphs: [
        "NewRevGen does not buy or sell storm leads, run door knocking, or give insurance advice. We help you respond well to the homeowners who have already contacted you.",
      ],
    },
  ],
  setup: {
    heading: "What NewRevGen sets up for storm response",
    intro:
      "Storm response uses the same tools as your everyday lead handling, with stricter rules that you can switch on when volume spikes.",
    items: [
      {
        title: "Single intake list",
        text: "Every call, form, and text from a storm lands in one list in your CRM.",
      },
      {
        title: "Instant acknowledgment",
        text: "An immediate reply to every request, with honest timing you control.",
      },
      {
        title: "Urgent leak triage",
        text: "Requests that mention active leaks or water inside are flagged and routed first.",
      },
      {
        title: "Scheduling queue",
        text: "A queue your team controls, with preferred times and addresses ready for routing.",
      },
      {
        title: "Status updates",
        text: "Pre-approved update messages so homeowners know where they stand.",
      },
      {
        title: "Hand-off to estimate follow-up",
        text: "Storm inspections flow into the same estimate follow-up as the rest of your work.",
      },
    ],
    approvalNote:
      "You approve the storm message templates and triage rules in advance, and your team makes the final scheduling calls.",
  },
  related: [
    relatedLinks.missedCalls,
    relatedLinks.estimates,
    relatedLinks.ai,
    relatedLinks.missedCallTool,
    relatedLinks.hub,
    relatedLinks.operations,
  ],
  faq: roofingFaq([
    {
      q: "Should storm leads get a different process than normal leads?",
      a: "Use the same system with storm rules switched on: faster acknowledgment, stricter triage, and more status updates. That way storm leads do not end up in a separate notebook or spreadsheet that falls apart later.",
    },
    {
      q: "How do we keep homeowners from calling other roofers while they wait?",
      a: "You cannot control that, but you can make waiting easier. A quick acknowledgment, honest timing, and regular updates give homeowners a reason to wait for you instead of starting over with someone else.",
    },
    {
      q: "Can the system book inspections automatically?",
      a: "It can offer open times and book them if you want. Some owners prefer to approve the schedule during a surge, so the system can also collect preferred times and leave the final booking to your team.",
    },
    {
      q: "Do you handle insurance claims?",
      a: "No. We do not give insurance advice or handle claims. The system can record whether a homeowner has filed a claim so your team has the context.",
    },
    {
      q: "When should we set up storm lead response?",
      a: "Before you need it. Setting it up during a calm period lets you test the messages and routing so they are ready when the next storm hits.",
    },
  ]),
  cta: roofingCta,
  service: {
    name: "Storm lead response for roofing companies",
    serviceType: "Storm lead intake, triage, and follow-up",
    description:
      "NewRevGen sets up storm lead intake, instant acknowledgment, urgent leak triage, a scheduling queue, status updates, and estimate follow-up for roofing companies handling surges after hail or wind damage.",
    audience: "Owner-led roofing contractors",
  },
};

export const roofingServicePages: ServicePageContent[] = [
  aiForRoofingContent,
  missedCallRecoveryContent,
  estimateFollowUpContent,
  stormLeadResponseContent,
];

export function getRoofingServicePage(slug: string): ServicePageContent | undefined {
  return roofingServicePages.find((page) => page.path === `${roofingHubPath}/${slug}`);
}

export const roofingHubContent = {
  path: roofingHubPath,
  meta: {
    title: "AI and Automation for Roofing Companies | NewRevGen",
    description:
      "NewRevGen helps owner-led roofers answer missed calls, reply to leads faster, follow up on estimates, and handle storm surges with practical AI systems.",
  },
  eyebrow: "Roofing",
  h1: "Systems for owner-led roofing companies.",
  intro:
    "NewRevGen helps owner-led roofing contractors answer more calls, respond to leads faster, and follow up on every estimate, using AI and automation built on the tools they already use. Start with the problem closest to booked work.",
  quickAnswer: {
    q: "What does NewRevGen do for roofing companies?",
    a: "NewRevGen sets up practical AI and automation for roofing contractors: missed-call text-back and AI call answering, instant replies to web and Google leads, estimate follow-up, and storm surge intake. We start with one workflow, build it on your current phone system and CRM, and measure it before expanding.",
  },
  pages: roofingServicePages.map((page) => ({
    href: page.path,
    label: page.h1,
    description: page.meta.description,
  })),
  tools: [relatedLinks.missedCallTool, relatedLinks.estimateTool],
  approach: [
    "We start with one workflow, usually missed calls or estimate follow-up.",
    "We build on your current phone system, forms, and CRM wherever they allow it.",
    "You approve every message template, and bulk sends only go out after you review the list.",
    "We agree up front on what we will measure, then expand only after the first workflow is useful.",
  ],
  otherTrades: relatedLinks.operations,
  cta: roofingCta,
};
