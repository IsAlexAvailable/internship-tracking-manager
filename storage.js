import {Internship} from "./Internship.js";

let internships = [];

function loadInternshipsFromStorage() {
    // Load internships from imported saved data or create an empty array
    const rawData = JSON.parse(localStorage.getItem("internships")) || [];

    // maps JSON objects to Internship objects in the internships array
    internships = rawData.map(item => new Internship(
    item.company,
    item.role,
    item.deadline,
    item.status,
    item.location,
    item.jdlink,
    item.notes,
    item.id
    ));
}

export function getInternships() {
    // Return a copy of internships
    return [...internships];
}

// saves internship list to local storage
function saveToLocalStorage() {
    localStorage.setItem("internships", JSON.stringify(internships));
}

// reassigns all internships that don't match the given id
export function deleteInternship(id) {
    internships = internships.filter(item => item.id !== id);
    saveToLocalStorage();
}

// resets internship list
export function deleteAllInternships() {
    internships = [];
    saveToLocalStorage();
}

export function updateInternship(internship, newFields) {
    for (const key in newFields) {
        internship[key] = newFields[key];
    }

    saveToLocalStorage();
}

export function addInternship(company, role, deadline, status, location, jdlink, notes) {
    

    // Input validation
    const isValid = Internship.validate(company, role, deadline, jdlink, notes);
    if (!isValid) {
        alert("Mandatory fields are required");
        return;
    }

    const newInternship = new Internship(company, role, deadline, status, location, jdlink, notes);

    // Add it to our array
    internships.push(newInternship);
    saveToLocalStorage();
}

// Runs this when imported into app
loadInternshipsFromStorage();