export const DIFFICULTY_RATES = {
  iniciante: 0.1,
  intermediario: 0.2,
  avancado: 0.35,
  especialista: 1,
};

const SMALL_WORDS = new Set([
  "a",
  "o",
  "os",
  "as",
  "e",
  "de",
  "da",
  "do",
  "das",
  "dos",
  "em",
  "no",
  "na",
  "nos",
  "nas",
  "por",
  "com",
  "um",
  "uma",
]);

function isWordToken(token) {
  return /^[\p{L}\p{N}]+$/u.test(token);
}

export function tokenizeText(text) {
  return (
    text.match(/\r\n|\n|[ \t]+|[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*|[^\s]/gu) ||
    []
  );
}

export function normalizeWord(word = "") {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "")
    .toLowerCase();
}

export function buildStudyTokens(text, difficulty) {
  const tokens = tokenizeText(text);

  const wordIndexes = tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => isWordToken(normalizeWord(token)))
    .filter(({ token }) => !SMALL_WORDS.has(normalizeWord(token)));

  const rate = DIFFICULTY_RATES[difficulty] ?? 0.1;
  const amountToHide = Math.max(1, Math.floor(wordIndexes.length * rate));

  const chosen = pickRandomIndexes(wordIndexes, amountToHide);
  const hiddenSet = new Set(chosen.map((item) => item.index));

  return tokens.map((token, index) => {
    if (token === "\n" || token === "\r\n") {
      return {
        id: crypto.randomUUID(),
        type: "newline",
        value: token,
      };
    }

    if (!isWordToken(normalizeWord(token))) {
      return {
        id: crypto.randomUUID(),
        type: /[ \t]+/.test(token) ? "space" : "punct",
        value: token,
      };
    }

    return {
      id: crypto.randomUUID(),
      type: "word",
      original: token,
      hidden: hiddenSet.has(index),
      status: hiddenSet.has(index) ? "idle" : "visible",
      userValue: "",
      checked: false,
    };
  });
}

function pickRandomIndexes(items, count) {
  const cloned = [...items];

  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  return cloned.slice(0, count);
}

export function checkAnswer(inputValue, originalWord) {
  return normalizeWord(inputValue) === normalizeWord(originalWord);
}
