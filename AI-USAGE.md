# AI Usage Log

# AI Usage Log

I used Claude (Anthropic) throughout this build as a pairing partner — planning the
architecture, generating first-pass component code, and explaining tradeoffs back to me
so I could defend them. The three moments below are real judgment calls from that
process, not AI output I shipped unread.

## AI moment 1 — the default visual design would have been generic

- What I was trying to do: Get a distinctive visual identity for the app, not a
  templated one, since design & creativity is 25% of the grade.
- The prompt I wrote: Asked for a design direction for a neighbourhood tool-lending app,
  grounded in the actual subject rather than a generic look.
- What the AI gave back: Before proposing anything, it flagged that the current default
  "AI-generated" look clusters around a small number of patterns — most commonly a warm
  cream background with a terracotta/clay accent — and that this specific accent colour
  is close to Anthropic's own product accent, so it reads as an obvious AI "tell" on a
  design brief.
- What was wrong / weak / risky about it: If I'd just accepted the first visual
  direction offered, there was a real risk of landing on exactly that generic warm-cream
  the code on items was not running, and some of the cards were hidden
  the filtering part wasnt filtering anything
- What I changed and why: Pushed for a concept actually grounded in the product — a
  literal tool shed / pegboard — which produced a dark workshop palette, price-tag-styled
  item cards, and a deliberately different type pairing. I checked the result against
  "would this be the same default answer for a different brief" before accepting it.
  I also changed the color to make it dark.
  I changed how items were placed


## AI moment 2 — the AI's first-instinct build would have implemented Thabo's dark patterns

- What I was trying to do: Build the features in Thabo's brief without just implementing
  everything literally, since the brief explicitly tests whether I'd build
  requested-but-harmful features "because the client asked."
- The prompt I wrote: Asked for the brief to be specified into what should be built, cut,
  or reshaped, before any code was written.
- What the AI gave back: It named the forced-signup-before-browsing wall and the fake
  "3 people are looking at this" urgency counter as dark patterns — manipulative because
  they either block real value to farm emails, or fabricate social proof that isn't real
  data — and proposed refusing or reshaping both, with reasons a non-technical founder
  could follow.
- What was wrong / weak / risky about it: This is the trap the brief warns about
  directly: a less careful pass (by me or by an AI) could have implemented these cleanly
  and correctly, which the brief states explicitly scores *worse* than refusing them,
  because correct code in service of a bad decision is still a bad decision.
- What I changed and why: Kept the refusals, and made sure both were written up honestly
  in FOUNDER-RESPONSE.md in Thabo's language rather than buried in code comments only he'd
  never read.

## AI moment 3 — a naive pricing calculation would have been confidently wrong

- What I was trying to do: Calculate the total price for a booking, given that items can
  be priced per hour, per day, or per week.
- The prompt I wrote: Asked for the booking total calculation, given a date range
  selected in the UI and an item's `Price` (amount + period).
- What the AI gave back: Flagged that the obvious approach — multiply the item's
  `amountCents` by the number of days in the selected range — is wrong for anything not
  priced per day: an hourly item booked over 3 days would be overcharged 3x its real
  hourly rate, and a weekly item would be wildly overcharged if billed per day instead of
  per week.
- What was wrong / weak / risky about it: 
  a wrong total shown confidently to a user.
  couldnt open a page for each item
- What I changed and why: The `describeTotal` function branches explicitly on
  `price.period`, only multiplying by the day count when the period is actually `"day"`
  or `"week"` (rounded up to whole weeks), and leaving hourly prices unmultiplied by the
  date range. I tested it by hand against the mock items with different periods
  `itm_001` is priced per day, `itm_005` per day,
  
