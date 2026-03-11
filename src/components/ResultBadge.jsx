import React from "react";

export default function ResultBadge({ status, original, checked }) {
  if (!checked) {
    return null;
  }

  if (status === "correct") {
    return (
      <span className="result-badge correct">
        ✓
      </span>
    );
  }

  return (
    <span className="result-badge wrong">
      ✗ {original}
    </span>
  );
}