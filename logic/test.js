const { editCell, getCommitLog, hf } = require('./engine');
const { rollbackTo } = require('./rollback');
const { formatCommit } = require('./diff');

editCell(0, 0, 10); // commit 1: A1
editCell(1, 0, 5);  // commit 2: A2
editCell(0, 1, 7);  // commit 3: B1

getCommitLog().forEach(c => console.log(formatCommit(c)));

rollbackTo(1);
console.log('\nafter rollback to #1:');
console.log('A1 =', hf.getCellValue({ sheet: 0, row: 0, col: 0 })); // expect 10
console.log('A2 =', hf.getCellValue({ sheet: 0, row: 1, col: 0 })); // expect 3
console.log('B1 =', hf.getCellValue({ sheet: 0, row: 0, col: 1 })); // expect 2