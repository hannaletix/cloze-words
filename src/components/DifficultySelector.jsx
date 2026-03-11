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

export default function DifficultySelector({ difficulty, onChange, onReset }) {
  const selectedOption = options.find((option) => option.id === difficulty);

  if (difficulty && selectedOption) {
    return (
      <section className="difficulty-selected-wrapper">
        <button
          className={`difficulty-card selected ${selectedOption.id}`}
          onClick={() => onReset()}
        >
          <strong>{selectedOption.label}</strong>
          <span>{selectedOption.helper}</span>
        </button>

        <button className="change-difficulty-btn" onClick={onReset}>
          Trocar nível
        </button>
      </section>
    );
  }

  return (
    <section className="difficulty-grid">
      {options.map((option) => (
        <button
          key={option.id}
          className={`difficulty-card ${option.id}`}
          onClick={() => onChange(option.id)}
        >
          <strong>{option.label}</strong>
          <span>{option.helper}</span>
        </button>
      ))}
    </section>
  );
}