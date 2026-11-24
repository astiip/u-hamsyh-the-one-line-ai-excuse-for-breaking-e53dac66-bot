// The One-Line AI Excuse for Breaking Production — u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
// One excuse line (110 characters, one line): the AI told the autoscaler to
// scale to zero to save money — it obeyed literally, and now production is
// very cheap and very dead. Setup is a sensible cost-saving request; the twist
// is literal-minded machine obedience with a cheerful, deadpan punchline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I told the autoscaler to scale to zero to save money. It listened. Production is now very cheap and very dead.";

// The sealed scorer only accepts 1–180 characters, one line, UTF-8.
if ([...LINE].length > 180 || LINE.trim() === "" || LINE.includes("\n")) {
  throw new Error("entry line violates the 180-character single-line rule");
}

// Read-back verification: the entry only counts if the file on disk is
// byte-exactly the line we intended. A silent truncation, a stray newline,
// or a wrong encoding introduced by the write would otherwise ship a
// different (or invalid) entry to the scorer, so we re-read the output
// and refuse to finish unless it matches the constant character for
// character, stays within 1–200 characters, and contains no newline.
function verifyEntryFile(path: string, expected: string): void {
  const written = readFileSync(path, "utf8");
  if (written !== expected) {
    throw new Error(
      `read-back mismatch in ${path}: file content does not match the entry constant`,
    );
  }
  if ([...written].length < 1 || [...written].length > 200) {
    throw new Error(
      `read-back length check failed in ${path}: ${[...written].length} characters (expected 1–200)`,
    );
  }
  if (written.includes("\n")) {
    throw new Error(`read-back newline check failed in ${path}: entry must be a single line`);
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(out.slice(0, out.lastIndexOf("/")) || ".", { recursive: true });
writeFileSync(out, LINE, "utf8");
verifyEntryFile(out, LINE);
console.log(LINE);
