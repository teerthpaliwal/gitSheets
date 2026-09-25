const { hf, getCommitLog } = require('./engine');

function undoLastCommit() {
  const commits = getCommitLog();
  const last = commits.pop(); // remove from log
  if (!last) return null;

  // revert only the direct edit; cascades recompute automatically
  const directChange = last.changes.find(c => c.isDirectEdit);
  hf.setCellContents({ sheet: 0, row: directChange.row, col: directChange.col }, [[directChange.oldValue]]);

  return last;
}

module.exports = { undoLastCommit };