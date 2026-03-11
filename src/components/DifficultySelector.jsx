import React from "react";

const options = [
  {
    id: "iniciante",
    label: "Iniciante",
    helper: "Oculta poucas palavras",
  },
  {
    id: "intermediario",
    label: "Intermediário",
    helper: "Oculta mais palavras",
  },
  {
    id: "avancado",
    label: "Avançado",
    helper: "Oculta muitas palavras",
  },
  {
    id: "especialista",
    label: "Especialista",
    helper: "Oculta praticamente tudo",
  },
];

export default function DifficultySelector({ difficulty, onChange }) {
  return (
    <section className="difficulty-grid">
      {options.map((option) => (
        <button
          key={option.id}
          className={`difficulty-card ${
            difficulty === option.id ? "selected" : ""
          } ${option.id}`}
          onClick={() => onChange(option.id)}
        >
          <strong>{option.label}</strong>
          <span>{option.helper}</span>
        </button>
      ))}
    </section>
  );
}