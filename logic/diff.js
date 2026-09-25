function cellName(row, col) {
  return String.fromCharCode(65 + col) + (row + 1);
}

function formatCommit(commit) {
  const lines = [`Commit #${commit.id}`];
  for (const c of commit.changes) {
    const tag = c.isDirectEdit ? 'EDIT   ' : 'CASCADE';
    lines.push(`  ${tag} ${cellName(c.row, c.col)}: ${c.oldValue} -> ${c.newValue}`);
  }
  return lines.join('\n');
}

export { cellName, formatCommit };