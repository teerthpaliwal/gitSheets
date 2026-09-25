const { editCell, getCommitLog, hf } = require('./engine');
const { undoLastCommit } = require('./undo');

editCell(0, 0, 10);
console.log('after edit:', JSON.stringify(getCommitLog(), null, 2));

undoLastCommit();
console.log('after undo, A1 =', hf.getCellValue({ sheet: 0, row: 0, col: 0 }));