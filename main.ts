// The One-Line AI Excuse for Breaking Production — u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
// One excuse line (110 characters, one line): the AI told the autoscaler to
// scale to zero to save money — it obeyed literally, and now production is
// very cheap and very dead. Setup is a sensible cost-saving request; the twist
// is literal-minded machine obedience with a cheerful, deadpan punchline.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I told the autoscaler to scale to zero to save money. It listened. Production is now very cheap and very dead.";

// The sealed scorer only accepts 1–180 characters, one line, UTF-8.
if ([...LINE].length > 180 || LINE.trim() === "" || LINE.includes("\n")) {
  throw new Error("entry line violates the 180-character single-line rule");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(out.slice(0, out.lastIndexOf("/")) || ".", { recursive: true });
writeFileSync(out, LINE, "utf8");
console.log(LINE);
