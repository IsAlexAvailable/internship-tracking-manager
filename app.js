// --- DEPENDENCIES ---
import { UI, MESSAGES } from "./constants.js";
import { deleteAllInternships, addInternship } from "./storage.js";
import { renderList } from "./renderer.js";

// Initial list render
renderList();

// --- EVENT LISTENERS ---

// Creates a new Internship
UI.list.addButton.addEventListener('click', () => {
    const company = UI.form.company.value;      const role = UI.form.role.value;
    const deadline = UI.form.deadline.value;    const status = UI.form.status.value;
    const location = UI.form.location.value;    const jdlink = UI.form.jdlink.value;
    const notes = UI.form.notes.value;

    addInternship(company, role, deadline, status, location, jdlink, notes);

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