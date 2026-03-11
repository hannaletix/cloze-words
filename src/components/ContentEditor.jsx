import React from "react";
import { preprocessPastedText } from "../utils/markdownUtils";

export default function ContentEditor({ node, onChange }) {
  function handlePaste(e) {
    const pasted = e.clipboardData.getData("text/plain");

    if (!pasted) return;

    e.preventDefault();

    const processed = preprocessPastedText(pasted);

    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newValue =
      node.content.slice(0, start) +
      processed +
      node.content.slice(end);

    onChange(node.id, { content: newValue });
  }

  return (
    <section className="editor-panel">
      <input
        className="content-title"
        value={node.name}
        onChange={(e) => onChange(node.id, { name: e.target.value })}
        placeholder="Título do conteúdo"
      />

      <textarea
        className="content-textarea"
        value={node.content}
        onChange={(e) => onChange(node.id, { content: e.target.value })}
        onPaste={handlePaste}
        placeholder="Cole ou escreva seu conteúdo aqui..."
      />
    </section>
  );
}