import Handsontable from 'handsontable';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { editCell, getCommitLog, hf } from '../../logic/engine.js';
import { formatCommit } from '../../logic/diff.js';
import { rollbackTo } from '../../logic/rollback.js';

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
  renderLog();
},
});

function renderLog() {
  const log = document.getElementById('log');
  log.innerHTML = '';

  const reset = document.createElement('button');
  reset.textContent = 'Reset to original';
  reset.onclick = () => {
    rollbackTo(0);
    hot.loadData(hf.getSheetValues(0));
    renderLog();
  };
  log.append(reset);

  for (const commit of getCommitLog()) {
    const text = document.createElement('pre');
    text.textContent = formatCommit(commit);

    const btn = document.createElement('button');
    btn.textContent = `Undo back to before #${commit.id}`;
    btn.onclick = () => {
      rollbackTo(commit.id - 1);
      hot.loadData(hf.getSheetValues(0));
      renderLog();
    };

    log.append(text, btn);
  }
}