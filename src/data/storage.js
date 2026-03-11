const STORAGE_KEY = "study-cloze-tree";

export function getInitialData() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
}

export function saveData(tree) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
}

export function createFolder(tree, parentId, name) {
  const newFolder = {
    id: crypto.randomUUID(),
    type: "folder",
    name,
    children: [],
  };

  if (!parentId) {
    return [...tree, newFolder];
  }

  return insertIntoTree(tree, parentId, newFolder);
}

export function createTextContent(tree, parentId, title) {
  const newContent = {
    id: crypto.randomUUID(),
    type: "content",
    name: title,
    content: "",
  };

  return insertIntoTree(tree, parentId, newContent);
}

function insertIntoTree(nodes, parentId, newNode) {
  return nodes.map((node) => {
    if (node.id === parentId && node.type === "folder") {
      return {
        ...node,
        children: [...node.children, newNode],
      };
    }

    if (node.children) {
      return {
        ...node,
        children: insertIntoTree(node.children, parentId, newNode),
      };
    }

    return node;
  });
}

export function updateNode(tree, id, patch) {
  return tree.map((node) => {
    if (node.id === id) {
      return { ...node, ...patch };
    }

    if (node.children) {
      return {
        ...node,
        children: updateNode(node.children, id, patch),
      };
    }

    return node;
  });
}

export function deleteNode(tree, id) {
  return tree
    .filter((node) => node.id !== id)
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNode(node.children, id),
        };
      }

      return node;
    });
}
