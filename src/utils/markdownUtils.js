export function preprocessPastedText(text) {
  return (
    text
      .replace(/\r\n/g, "\n")

      // títulos
      .replace(/^#{1,6}\s+(.*)$/gm, "$1")

      // separadores
      .replace(/^---+$/gm, "")

      // blockquote
      .replace(/^\s*>\s?/gm, "")

      // bullets com recuo
      .replace(/^\s*-\s+/gm, "• ")
      .replace(/^\s*\*\s+/gm, "• ")

      // negrito / itálico / código inline
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")

      // links markdown [texto](url) -> texto
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")

      // tabelas: só limpa a linha separadora | --- | --- |
      .replace(/^\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/gm, "")

      // remover excesso de linhas vazias
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}
