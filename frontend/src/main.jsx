import Handsontable from 'handsontable';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { editCell, getCommitLog, hf } from '../../logic/engine.js';
import { formatCommit } from '../../logic/diff.js';

const hot = new Handsontable(document.getElementById('grid'), {
  data: hf.getSheetValues(0),
  licenseKey: 'non-commercial-and-evaluation',
  themeName: 'ht-theme-main',
  afterChange(changes, source) {
  if (source === 'loadData') return;

  for (const [row, col, oldValue, newValue] of changes) {
    editCell(row, col, newValue);
  }

  hot.loadData(hf.getSheetValues(0));
  document.getElementById('log').textContent =
    getCommitLog().map(formatCommit).join('\n');
},
});