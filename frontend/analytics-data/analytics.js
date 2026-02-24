import { renderStats } from './analytics-renderer.js';
import { loadInternshipsFromBackend } from '../storage.js';
import { APP_NAMES, UI } from '../constants.js';

async function init() {
    UI.title.textContent = APP_NAMES.TITLE;
    await loadInternshipsFromBackend();
    renderStats();
}

init();