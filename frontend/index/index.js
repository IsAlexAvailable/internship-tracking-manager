// --- DEPENDENCIES ---
import { UI, MESSAGES } from "../constants.js";
import { loadInternshipsFromBackend, deleteAllInternships, addInternship } from "../storage.js";
import { renderList } from "./index-renderer.js";

// Initial list render
async function init() {
    await loadInternshipsFromBackend();
    renderList();
}

init();

// --- EVENT LISTENERS ---

// Creates a new Internship
UI.list.addButton.addEventListener('click', async () => {
    const inputObject = {
        company : UI.form.company.value,
        role : UI.form.role.value, 
        deadline : UI.form.deadline.value,
        status : UI.form.status.value,
        location : UI.form.location.value,
        jdlink : UI.form.jdlink.value,
        notes : UI.form.notes.value
    }

    if (await addInternship(inputObject)) { renderList(); }

    // Reset input form values
    Object.values(UI.form).forEach(input => { input.value = ""});
    
    renderList();
})

// Clears all internships
UI.list.clearAllButton.addEventListener('click', () => {
    // get confirmation from user to clear internships
    const confirmation = confirm(MESSAGES.CONFIRM_CLEAR_ALL);
    if (!confirmation) { return; }

    deleteAllInternships();
    renderList();
});

// Rerenders UI
UI.filters.search.addEventListener('input', renderList);

// Rerenders UI
UI.filters.sort.addEventListener('change', renderList);

// Modifies its HTML attribute for CSS handling and rerenders UI
const statusSelect = UI.form.status;
statusSelect.addEventListener('change', (event) => {
    statusSelect.setAttribute("data-status", event.target.value.toLowerCase());
    renderList();
});