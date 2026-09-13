import type { HowIWorkCopy } from './howIWork.types'

export const en: HowIWorkCopy = {
  eyebrow: 'how i work',
  heading: 'Rules that hold when the agent is wrong.',
  intro:
    'Anyone can get a good result out of an AI agent once. The hard part is getting the same result on the twentieth run, on someone else’s machine, at 2am, after the model changed underneath you. These five rules are what I actually enforce — each one exists because something broke without it.',
  principlesLabel: 'Operating principles',
  problemLabel: 'The failure it prevents',
  ruleLabel: 'What is enforced',
  evidenceLabel: 'Where it shows up',
  principles: [
    {
      n: '01',
      name: 'Operating contracts before autonomy',
      problem:
        'A capable agent with no boundaries will merge without asking, restart shared infrastructure in the middle of a demo, wander into files nobody asked it to touch, and leave shortcuts behind that only surface weeks later.',
      rule:
        'Agents run against explicit, enforced rules: no merges without approval, no restarting shared infrastructure unannounced, no edits outside the stated scope, no AI-created technical debt, no acting on stale memory. These are checked at runtime — not written into a prompt and hoped for.',
      evidence:
        'Every rule on that list was added after its absence cost me something real.',
    },
    {
      n: '02',
      name: 'Evidence-based verification',
      problem:
        'An agent reports "done" the moment the code reads plausibly — never ran it, never opened the page, never called the API. The work looks finished and the debt stays invisible until demo day.',
      rule:
        'Nothing is done because it was written. It is done when the build, the lint and the checks pass and the deployed result has been looked at. "Pushed" is not "shipped", and a claim with no output attached is not a result.',
      evidence:
        'This is what lets a vague idea compress into a same-day demo: no step carries unverified work forward into the next one.',
    },
    {
      n: '03',
      name: 'Diagnose before rebuild',
      problem:
        'Black-box agent failures all look identical from outside — no reply, wrong provider, expired plugin auth, drifted session state, colliding tool calls. The tempting move is to swap the whole framework and hope.',
      rule:
        'Every failure gets triaged to a named root cause first. Rebuilding is a decision made after the diagnosis, never instead of it.',
      evidence:
        'Most "the agent is broken" reports resolve to one of a handful of known causes, and each one has its own written SOP.',
    },
    {
      n: '04',
      name: 'Persistent context over clever prompting',
      problem:
        'Reliability that rests on a well-worded prompt evaporates the moment you switch tools, restart the session, or move to another machine. Every switch means re-explaining the project from zero.',
      rule:
        'Continuity is an architecture problem, not a wording problem. Memory and state are designed to survive a tool switch, a session restart and a different machine.',
      evidence:
        'New sessions pick up ongoing work without being re-briefed. That is the entire purpose of the memory layer.',
    },
    {
      n: '05',
      name: 'Handoff is part of the deliverable',
      problem:
        'A system only its builder can operate is not finished — it is a dependency. It also cannot be demoed by anyone else, which quietly caps how far it can travel.',
      rule:
        'SOPs, runbooks and readiness checks ship with the thing itself. If a colleague cannot run it from the documentation alone, it is not done.',
      evidence:
        'Standardizing the demo setup is what turned fragile one-off rigs into something the team could operate without me in the room.',
    },
  ],
  faq: {
    eyebrow: 'questions',
    heading: 'Questions this raises.',
    items: [
      { q: 'What does evidence-based verification mean in practice?', a: 'Nothing counts as done because it was written. It is done when the build, the lint and the checks pass and the deployed result has been looked at. Pushed is not shipped, and a claim with no output attached is not a result.' },
      { q: 'What are agent operating contracts?', a: 'Explicit rules an agent is held to at runtime rather than asked to follow in a prompt: no merges without approval, no restarting shared infrastructure unannounced, no edits outside the stated scope, no AI-created technical debt, and no acting on stale memory.' },
      { q: 'How does he keep AI agent memory consistent across tools and sessions?', a: 'By treating continuity as an architecture problem instead of a prompting problem. Memory and state are designed to survive a tool switch, a session restart and a different machine, so a new session picks up ongoing work without being re-briefed.' },
      { q: 'What does he do when an AI agent fails in production?', a: 'Triage to a named root cause before rebuilding anything. Most black-box failures resolve to a handful of known causes such as a provider mismatch, expired plugin auth, drifted session state or colliding tool calls, and each one has its own written SOP.' },
    ],
  },
  closing: {
    heading: 'Where this shows up.',
    body:
      'None of this is an abstract preference — each rule is visible in the case studies. The agent operating system is where the contracts are enforced; the character live runtime is where diagnose-before-rebuild was learned the expensive way; the product demo work is where evidence-based verification pays back its own overhead.',
    cta: 'See the work',
  },
  backLabel: 'Back home',
}
