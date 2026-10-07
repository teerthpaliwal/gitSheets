import { hf, getCommitLog } from './engine.js';

function rollbackTo(commitId) {
  const commits = getCommitLog();
  while (commits.length && commits[commits.length - 1].id > commitId) {
    const { row, col, oldContent } = commits.pop().edited;
    hf.setCellContents({ sheet: 0, row, col }, [[oldContent]]);
  }
}

export { rollbackTo };