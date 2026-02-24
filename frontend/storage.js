import { Internship } from "./Internship.js";
import { API_URL } from "./constants.js";

let internships = [];

export async function loadInternshipsFromBackend() {
    const res = await fetch(API_URL);
    // An array of JSON objects representing each internship
    const rawData = await res.json();
    if (Array.isArray(rawData)) {
        // Maps JSON objects to Internship objects
        internships = rawData.map(item => new Internship(item));
    } else {
        internships = [];
    }
}

// POSTS internship to server.
async function saveInternshipToBackend(internship) {
    try {
        const res = await fetch(API_URL, {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(internship)
        })

        if (!res.ok) { throw new Error("Backend save failed!"); }

        // Save succeeded, now we can add to local copy
        const savedData = await res.json();
        const newInternship = new Internship(savedData);
        internships.push(newInternship);
        return true;
    } catch (error) { 
        console.error(error);
        return false;
    }
}

export function getInternships() {
    // Return a copy of internships
    return [...internships];
}

// saves internship list to local storage
function saveToLocalStorage() {
    localStorage.setItem("internships", JSON.stringify(internships));
}

async function deleteInternshipFromBackend(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
        method : 'DELETE'
        })
        if (!res.ok) { throw new Error("Backend deletion failed!") }

        // Delete succeeded, now we can remove from local copy
        internships = internships.filter(item => item.id !== id);
        return true;
    } catch (error) { 
        console.error(error);
        return false;
    }
}

// reassigns all internships that don't match the given id
export async function deleteInternship(id) {
    // Delete it from backend storage
    return deleteInternshipFromBackend(id);
}

// resets internship list
export function deleteAllInternships() {
    internships = [];
    // saveToLocalStorage();
}

export async function updateInternship(id, newFields) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
        method : 'PATCH',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(newFields)
        })

        if (!res.ok) { throw new Error("Backend update failed!") }
        
        // Update succeeded, now we can update local copy
        const updatedData = await res.json();
        const updatedInternship = new Internship(updatedData);
        const index = internships.findIndex(internship => internship.id === updatedInternship.id);
        if (index !== -1) { 
            internships[index] = updatedInternship; 
            return true;
        }            
    } catch (error) { 
        console.error(error);
        return false;
    }
}

export async function addInternship(object) {
    // Input validation
    const isValid = Internship.validate(object);
    if (!isValid) { throw new Error("Mandatory fields are required"); }

    const newInternship = new Internship(object);

    // Add it to our backend storage
    return saveInternshipToBackend(newInternship);
}