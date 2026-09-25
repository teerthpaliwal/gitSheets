const { editCell, getCommitLog } = require('./engine');

editCell(0, 0, 10); // change A1
console.log(JSON.stringify(getCommitLog(), null, 2));