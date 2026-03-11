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

export function tokenizeText(text) {
  return text.match(/\r\n|\n|\w+|[^\w\s]+|[ \t]+/g) || [];
}

export function normalizeWord(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w]/g, "")
    .toLowerCase();
}

export function buildStudyTokens(text, difficulty) {
  const tokens = tokenizeText(text);

  const wordIndexes = tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => /\w+/.test(token))
    .filter(({ token }) => !SMALL_WORDS.has(normalizeWord(token)));

  const amountToHide = Math.max(
    1,
    Math.floor(wordIndexes.length * DIFFICULTY_RATES[difficulty]),
  );

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

    if (!/\w+/.test(token)) {
      return {
        id: crypto.randomUUID(),
        type: /[ \t]+/.test(token) ? "space" : "punct",
        value: token,
      };
    }

    const hidden = hiddenSet.has(index);

    return {
      id: crypto.randomUUID(),
      type: "word",
      original: token,
      hidden,
      status: hidden ? "idle" : "visible",
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
