/**
 * The snippet that "types itself" in the hero editor, pre-tokenised once at
 * module load with a tiny TSX highlighter (good enough for this fixed code).
 */

const SOURCE = `import { Navbar, Hero, ProductGrid } from "@/ui";
import { getProducts } from "@/lib/catalog";

export default async function Home({ locale }: Props) {
  const t = await getTranslations(locale);
  const products = await getProducts({ featured: true });

  return (
    <main className="site">
      <Navbar links={t.nav} cta={t.order} />
      <Hero
        title={t.hero.title}
        action={{ label: t.order, href: "/order" }}
      />
      <ProductGrid items={products} columns={3} />
    </main>
  );
}`;

export type TokenKind = "ws" | "kw" | "str" | "num" | "tag" | "attr" | "fn" | "type" | "punct" | "id";

export interface Token {
  kind: TokenKind;
  text: string;
  /** Absolute character offset in the whole snippet (lines joined by "\n"). */
  start: number;
}

export interface Line {
  start: number;
  length: number;
  tokens: Token[];
}

const KEYWORDS = /^(import|from|export|default|async|function|const|await|return)\b/;

function tokenizeLine(src: string, offset: number): Token[] {
  const out: Token[] = [];
  let i = 0;
  let afterAngle = false;
  const push = (kind: TokenKind, text: string) => {
    out.push({ kind, text, start: offset + i });
    i += text.length;
  };
  while (i < src.length) {
    const rest = src.slice(i);
    let m: RegExpMatchArray | null;
    if ((m = rest.match(/^\s+/))) push("ws", m[0]);
    else if ((m = rest.match(/^"[^"]*"/))) push("str", m[0]);
    else if ((m = rest.match(KEYWORDS))) push("kw", m[0]);
    else if ((m = rest.match(/^(true|false|null|\d+)\b/))) push("num", m[0]);
    else if ((m = rest.match(/^<\/?(?=[A-Za-z])/))) {
      push("punct", m[0]);
      afterAngle = true;
      continue;
    } else if ((m = rest.match(/^[A-Za-z_$][\w$]*/))) {
      const word = m[0];
      const next = src[i + word.length] ?? "";
      const next2 = src[i + word.length + 1] ?? "";
      let kind: TokenKind = "id";
      if (afterAngle) kind = "tag";
      else if (next === "=" && next2 !== "=") kind = "attr";
      else if (next === ":") kind = "attr";
      else if (next === "(") kind = "fn";
      else if (/^[A-Z]/.test(word)) kind = "type";
      push(kind, word);
    } else push("punct", rest[0]);
    afterAngle = false;
  }
  return out;
}

function build(): Line[] {
  const lines: Line[] = [];
  let offset = 0;
  for (const text of SOURCE.split("\n")) {
    lines.push({ start: offset, length: text.length, tokens: tokenizeLine(text, offset) });
    offset += text.length + 1; // + "\n"
  }
  return lines;
}

export const CODE_LINES: Line[] = build();
export const CODE_TOKENS: Token[] = CODE_LINES.flatMap((l) => l.tokens);
export const CODE_LENGTH = SOURCE.length;

/**
 * Typing schedule: cumulative time (ms) at which each character appears.
 * Indentation lands instantly (like an editor's auto-indent), line breaks get
 * a short beat. Jitter is deterministic so server and client agree.
 */
export const CODE_TIMES: number[] = (() => {
  const times: number[] = [];
  let t = 0;
  for (const line of CODE_LINES) {
    const text = SOURCE.slice(line.start, line.start + line.length);
    const indent = text.length - text.trimStart().length;
    for (let c = 0; c < text.length; c++) {
      if (c >= indent) t += 5.5 + ((line.start + c) * 37 % 7) * 0.9;
      times.push(t);
    }
    t += text.length === 0 ? 90 : 60; // the "\n"
    times.push(t);
  }
  return times;
})();

export const TOKEN_COLOR: Record<TokenKind, string> = {
  ws: "",
  kw: "text-[#ff7a45]",
  str: "text-[#9fd8a9]",
  num: "text-[#ffb38a]",
  tag: "text-[#ffd29e]",
  type: "text-[#ffd29e]",
  attr: "text-[#a9b8d6]",
  fn: "text-[#f4ead8]",
  punct: "text-[#76716a]",
  id: "text-[#cbc6bc]",
};
