const { hf, getCommitLog } = require('./engine');

function rollbackTo(commitId) {
  const commits = getCommitLog();
  while (commits.length && commits[commits.length - 1].id > commitId) {
    const last = commits.pop();
    const direct = last.changes.find(c => c.isDirectEdit);
    hf.setCellContents({ sheet: 0, row: direct.row, col: direct.col }, [[direct.oldValue]]);
  }
}

module.exports = { rollbackTo };