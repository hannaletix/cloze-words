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

  if (!token.hidden) {
    return <span>{token.original}</span>;
  }

  if (token.status === "correct") {
    return <span className="cloze-correct-word">{token.original}</span>;
  }

  const isWrong = token.status === "wrong";

  return (
    <span className={`cloze-wrapper ${token.status}`}>
      <input
        className={`cloze-input ${token.status}`}
        value={token.userValue}
        onChange={(e) => onChange(token.id, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isWrong) {
            e.preventDefault();
            onCheck(token.id);
          }
        }}
        autoComplete="off"
        disabled={isWrong}
        style={{ width: `${Math.max(token.original.length * 10, 90)}px` }}
      />

      {!isWrong && (
        <button className="check-btn" onClick={() => onCheck(token.id)}>
          ok
        </button>
      )}

      <ResultBadge
        status={token.status}
        original={token.original}
        checked={token.checked}
      />
    </span>
  );
}