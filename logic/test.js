import { hf, editCell, getCommitLog } from './engine.js';
import { formatCommit } from './diff.js';
import { rollbackTo } from './rollback.js';

editCell(0, 0, 10); // commit 1: A1
editCell(1, 0, 5);  // commit 2: A2
editCell(0, 1, 7);  // commit 3: B1

getCommitLog().forEach(c => console.log(formatCommit(c)));

rollbackTo(1);
console.log('\nafter rollback to #1:');
console.log('A1 =', hf.getCellValue({ sheet: 0, row: 0, col: 0 })); // expect 10
console.log('A2 =', hf.getCellValue({ sheet: 0, row: 1, col: 0 })); // expect 3
console.log('B1 =', hf.getCellValue({ sheet: 0, row: 0, col: 1 })); // expect 2

editCell(0, 2, 100); // overwrite C1's formula with a plain number
console.log('\nC1 overwritten:', hf.getCellFormula({ sheet: 0, row: 0, col: 2 })); // undefined

rollbackTo(1);
console.log('C1 after rollback:', hf.getCellFormula({ sheet: 0, row: 0, col: 2 })); // expect '=A1+B1'