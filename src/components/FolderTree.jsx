import React, { useState } from "react";

export default function FolderTree({
  nodes,
  selectedId,
  onSelect,
  onCreateFolder,
  onCreateContent,
  onDeleteNode,
  depth = 0,
}) {
  return (
    <div>
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
          onCreateFolder={onCreateFolder}
          onCreateContent={onCreateContent}
          onDeleteNode={onDeleteNode}
          depth={depth}
        />
      ))}
    </div>
  );
}

function TreeNode({
  node,
  selectedId,
  onSelect,
  onCreateFolder,
  onCreateContent,
  onDeleteNode,
  depth,
}) {
  const [open, setOpen] = useState(true);

  const isSelected = selectedId === node.id;

  function createSubfolder(e) {
    e.stopPropagation();
    const name = prompt("Nome da subpasta:");

    if (name) {
      onCreateFolder(node.id, name);
    }
  }

  function createContent(e) {
    e.stopPropagation();
    const name = prompt("Título do conteúdo:");

    if (name) {
      onCreateContent(node.id, name);
    }
  }

  function remove(e) {
    e.stopPropagation();

    const confirmed = confirm(`Excluir "${node.name}"?`);

    if (confirmed) {
      onDeleteNode(node.id);
    }
  }

  return (
    <div>
      <div
        className={`tree-node ${isSelected ? "selected" : ""}`}
        style={{ paddingLeft: depth * 16 }}
        onClick={() => {
          onSelect(node.id);

          if (node.type === "folder") {
            setOpen((prev) => !prev);
          }
        }}
      >
        <span>
          {node.type === "folder" ? (open ? "📂" : "📁") : "📄"}
        </span>

        <span className="tree-label">{node.name}</span>

        {node.type === "folder" && (
         <div className="node-actions">
          <button
            className="icon-btn"
            onClick={createSubfolder}
            title="Adicionar subpasta"
          >
            📁+
          </button>

          <button
            className="icon-btn"
            onClick={createContent}
            title="Adicionar conteúdo"
          >
            📄+
          </button>
        </div>
        )}

        <button className="delete-btn" onClick={remove}>
          ×
        </button>
      </div>

      {open && node.children && node.children.length > 0 && (
        <FolderTree
          nodes={node.children}
          selectedId={selectedId}
          onSelect={onSelect}
          onCreateFolder={onCreateFolder}
          onCreateContent={onCreateContent}
          onDeleteNode={onDeleteNode}
          depth={depth + 1}
        />
      )}
    </div>
  );
}