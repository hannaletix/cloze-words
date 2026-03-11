import React from "react";
import ResultBadge from "./ResultBadge";

export default function ClozeToken({ token, onChange, onCheck }) {
  if (token.type === "newline") {
    return <br />;
  }

  if (token.type === "space") {
    return <span>{token.value}</span>;
  }

  if (token.type === "punct") {
    return <span>{token.value}</span>;
  }

  // palavra normal visível
  if (!token.hidden) {
    return <span>{token.original}</span>;
  }

  // ✅ se acertou, mostra só a palavra
  if (token.status === "correct") {
    return (
      <span className="cloze-correct-word">
        {token.original}
      </span>
    );
  }

  return (
    <span className={`cloze-wrapper ${token.status}`}>
      <input
        className={`cloze-input ${token.status}`}
        value={token.userValue}
        onChange={(e) => onChange(token.id, e.target.value)}
        autoComplete="off"
        style={{ width: `${Math.max(token.original.length * 10, 90)}px` }}
      />

      <button className="check-btn" onClick={() => onCheck(token.id)}>
        ok
      </button>

      <ResultBadge
        status={token.status}
        original={token.original}
        checked={token.checked}
      />
    </span>
  );
}