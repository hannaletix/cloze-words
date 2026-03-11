import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import ContentEditor from "./components/ContentEditor";
import DifficultySelector from "./components/DifficultySelector";
import StudySession from "./components/StudySession";
import {
  createFolder,
  createTextContent,
  deleteNode,
  getInitialData,
  saveData,
  updateNode,
} from "./data/storage";

export default function App() {
  const [tree, setTree] = useState(getInitialData);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("edit"); // edit | study
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    saveData(tree);
  }, [tree]);

  const selectedNode = useMemo(
    () => findNodeById(tree, selectedId),
    [tree, selectedId]
  );

  function handleCreateFolder(parentId, name, type = "folder") {
    setTree((prev) => createFolder(prev, parentId, name, type));
  }

  function handleCreateContent(parentId, title) {
    setTree((prev) => createTextContent(prev, parentId, title));
  }

  function handleUpdateNode(id, patch) {
    setTree((prev) => updateNode(prev, id, patch));
  }

  function handleDeleteNode(id) {
    setTree((prev) => deleteNode(prev, id));
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <div className="app-shell">
      <Sidebar
        tree={tree}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onCreateFolder={handleCreateFolder}
        onCreateContent={handleCreateContent}
        onDeleteNode={handleDeleteNode}
      />

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h1>Study Cloze</h1>
            <p>Pastas, subpastas e estudo com palavras ocultas.</p>
          </div>

          {selectedNode?.type === "content" && (
            <div className="topbar-actions">
              <button
                className={mode === "edit" ? "active" : ""}
                onClick={() => setMode("edit")}
              >
                Editar
              </button>
              <button
                className={mode === "study" ? "active" : ""}
                onClick={() => setMode("study")}
              >
                Estudar
              </button>
            </div>
          )}
        </header>

        {!selectedNode && (
          <section className="empty-state">
            <h2>Selecione ou crie um conteúdo</h2>
            <p>Crie uma matéria, uma subpasta e depois um texto para estudar.</p>
          </section>
        )}

        {selectedNode?.type === "content" && mode === "edit" && (
          <ContentEditor node={selectedNode} onChange={handleUpdateNode} />
        )}

        {selectedNode?.type === "content" && mode === "study" && (
          <>
            <DifficultySelector
              difficulty={difficulty}
              onChange={setDifficulty}
              onReset={() => setDifficulty(null)}
            />
            {difficulty && (
              <StudySession
                content={selectedNode.content}
                difficulty={difficulty}
              />
            )}
          </>
        )}

        {selectedNode && selectedNode.type !== "content" && (
          <section className="empty-state">
            <h2>{selectedNode.name}</h2>
            <p>Essa é uma pasta. Crie outra subpasta ou um conteúdo dentro dela.</p>
          </section>
        )}
      </main>
    </div>
  );
}

function findNodeById(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) return node;

    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }

  return null;
}