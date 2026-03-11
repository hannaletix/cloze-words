import React from "react";
import FolderTree from "./FolderTree";

export default function Sidebar({
  tree,
  selectedId,
  onSelect,
  onCreateFolder,
  onCreateContent,
  onDeleteNode,
}) {
  function handleCreateRootFolder() {
    const name = prompt("Nome da matéria:");

    if (name) {
      onCreateFolder(null, name);
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Matérias</h2>

        <button onClick={handleCreateRootFolder}>
          + Pasta
        </button>
      </div>

      <FolderTree
        nodes={tree}
        selectedId={selectedId}
        onSelect={onSelect}
        onCreateFolder={onCreateFolder}
        onCreateContent={onCreateContent}
        onDeleteNode={onDeleteNode}
      />
    </aside>
  );
}