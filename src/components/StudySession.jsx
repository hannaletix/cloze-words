import React, { useEffect, useMemo, useState } from "react";
import { buildStudyTokens, checkAnswer } from "../utils/textUtils";
import ClozeToken from "./ClozeToken";

export default function StudySession({ content, difficulty }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const generated = buildStudyTokens(content, difficulty);
    setTokens(generated);
  }, [content, difficulty]);

  const stats = useMemo(() => {
    const hidden = tokens.filter((t) => t.type === "word" && t.hidden);

    const correct = hidden.filter((t) => t.status === "correct").length;
    const wrong = hidden.filter((t) => t.status === "wrong").length;

    return {
      total: hidden.length,
      correct,
      wrong,
      pending: hidden.length - correct,
    };
  }, [tokens]);

  function handleInputChange(id, value) {
    setTokens((prev) =>
      prev.map((token) =>
        token.id === id
          ? {
              ...token,
              userValue: value,
              status: "idle",
            }
          : token
      )
    );
  }

  function handleCheck(id) {
    setTokens((prev) =>
      prev.map((token) => {
        if (token.id !== id) return token;

        const correct = checkAnswer(token.userValue, token.original);

        return {
          ...token,
          checked: true,
          status: correct ? "correct" : "wrong",
        };
      })
    );
  }

  function resetSession() {
    setTokens(buildStudyTokens(content, difficulty));
  }

  return (
    <section className="study-panel">
      <div className="study-header">
        <div className="stats-row">
          <span>Total: {stats.total}</span>
          <span>Acertos: {stats.correct}</span>
          <span>Erros: {stats.wrong}</span>
          <span>Faltando: {stats.pending}</span>
        </div>

        <button onClick={resetSession}>Nova rodada</button>
      </div>

      <div className="study-text">
        {tokens.map((token) => (
          <ClozeToken
            key={token.id}
            token={token}
            onChange={handleInputChange}
            onCheck={handleCheck}
          />
        ))}
      </div>
    </section>
  );
}