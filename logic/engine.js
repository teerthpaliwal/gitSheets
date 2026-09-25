const { HyperFormula } = require('hyperformula');

const hf = HyperFormula.buildFromArray([
  [1, 2, '=A1+B1'],
  [3, 4, '=A2+B2'],
], { licenseKey: 'gpl-v3' });

let commits = []; // in-memory commit log
let commitCounter = 0;

function editCell(row, col, value) {
  const before = hf.getSheetValues(0); // snapshot BEFORE the edit
  const changes = hf.setCellContents({ sheet: 0, row, col }, [[value]]);

  const changeRecords = changes.map(c => ({
    cellRef: `R${c.address.row}C${c.address.col}`,
    row: c.address.row,
    col: c.address.col,
    oldValue: before[c.address.row][c.address.col],
    newValue: c.newValue,
    isDirectEdit: c.address.row === row && c.address.col === col,
  }));

  const commit = { id: ++commitCounter, timestamp: Date.now(), changes: changeRecords };
  commits.push(commit);
  return commit;
}

function getCommitLog() {
  return commits;
}

module.exports = { editCell, getCommitLog, hf };