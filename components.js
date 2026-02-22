import { renderList } from "./renderer.js";
import {deleteInternship, updateInternship, getInternships } from "./storage.js";
import { STATUS_OPTIONS, UI } from "./constants.js";

// Toggles visibility of elements depending on search-filtered results
export function toggleVisibilities(filteredList) {
    const noResults = UI.list.NO_RESULTS;
    const totalResults = UI.list.totalResults;
    const clearAllButton = UI.list.clearAllButton;
    const sortContainer = UI.list.sortContainer;
    const searchInput = UI.filters.search;

    if (getInternships().length == 0) {
        clearAllButton.classList.add("hidden");
        sortContainer.classList.add("hidden");
        totalResults.classList.add("hidden");
    } else {
        clearAllButton.classList.remove("hidden");
        sortContainer.classList.remove("hidden");
        totalResults.classList.remove("hidden");
    }

    if (filteredList.length == 0 && searchInput.value.trim() !== "") {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
    }
}

// Creates a list item's edit panel
function createEditPanel(internship) {
    const container = document.createElement("div");
    container.className = "edit-panel hidden";
    container.innerHTML = 
    `<div class="edit-inputs">
        <input type="text" name="edit-role" class="edit-role" value="${internship.role}" placeholder="New Role">
        <input type="date" name="edit-deadline" class="edit-deadline" value="${internship.deadline}"> 
        <input type="text" name="edit-location" class="edit-location" value="${internship.location || ""}" placeholder="New Location">
        <input type="text" name="edit-jd-link" class="edit-jd-link" value="${internship.jdlink || ""}" placeholder="New JD Link"> 
    </div>
    <button class="save-edit-button">Save</button>`;
    container.onclick = (event) => {
        event.stopPropagation();
    }
    
    const saveButton = container.querySelector(".save-edit-button");
    saveButton.onclick = () => {
        const newRole = container.querySelector(".edit-role").value.trim();
        const newDeadline = container.querySelector(".edit-deadline").value;
        const newLocation = container.querySelector(".edit-location").value.trim();
        const newLink = container.querySelector(".edit-jd-link").value.trim();
        updateInternship(internship, {role: newRole, deadline: newDeadline, location: newLocation, jdlink: newLink});
        renderList();
    }
    return container;
}

function createEditButton(editContainer) {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.onclick = () => {
        editContainer.classList.toggle("hidden");
    }
    return editButton;
}

function createDeleteButton(internship) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => { 
            // get confirmation from user to delete internship
            const confirmation = confirm(MESSAGES.CONFIRM_DELETE);
            if (!confirmation) { return; }
            deleteInternship(internship.id); 
            renderList();
        }
        // assigns the delete-button class to element so CSS can style accordingly
        deleteButton.classList.add("delete-button");
        return deleteButton;
}

// Calls for internship status update and may ask renderer to wait (for confetti animation)
function updateStatus(internship, statusOption, shouldDelay = false) {
    updateInternship(internship, {status : statusOption})
    if (shouldDelay) { setTimeout(renderList, 600); } 
    else { renderList(); }
}

function playConfetti(element) {
    // Add a temporary class to the select bar
    element.classList.add("confetti-pop");
    
    // Remove it after the animation ends (600ms) so it can be fired again
    setTimeout(() => {
        element.classList.remove("confetti-pop");
    }, 600);
}

function createStatusBar(internship) {
    const confettiWrapper = document.createElement("div");
    confettiWrapper.style.position = "relative"; // Required for particles to position correctly
    confettiWrapper.style.display = "inline-block";

    const statusSelect = document.createElement("select");
    statusSelect.className = "status-select";
    statusSelect.setAttribute("data-status", internship.status.toLowerCase());
    statusSelect.setAttribute("name", "statusSelect");

    // event listener to update the entry's status
    statusSelect.onchange = (event) => { 
        const newStatus = event.target.value;
        statusSelect.setAttribute("data-status", newStatus.toLowerCase());
        const isOffer = newStatus.toLowerCase() === STATUS_OPTIONS.OFFER;
        if (isOffer) { 
            updateStatus(internship, newStatus, true);
            playConfetti(confettiWrapper);
         }
        else { updateStatus(internship, newStatus); }
    }
    
    for (const key in STATUS_OPTIONS) {
        // creates each option and selects the option already selected by the entry
        const status = STATUS_OPTIONS[key];
        const option = document.createElement("option");
        option.textContent = (status.charAt(0).toUpperCase() + status.slice(1));
        option.value = status;
        if (internship.status === status) { option.selected=true; }
        statusSelect.appendChild(option);
    }

    confettiWrapper.appendChild(statusSelect);

    return confettiWrapper;
}

function createViewPanel(internship) {
    const viewContainer = document.createElement("div");
    viewContainer.className = "view-panel hidden";
    const jdLink = internship.jdLink;
    viewContainer.innerHTML = `
    <div class="view-jd-link">
        <label>Job Description:</label>
        ${jdLink ? `<a href="${jdLink}" class="view-jd-button" target="_blank">View Job Description</a>` : `<p>No job description added yet.</p>`}
    </div>
    <div class="view-notes">
        <label>Notes:</label>
        <p>${internship.notes || "No notes added yet."} </p>
    </div>
    `;
    viewContainer.onclick = (event) => {
        event.stopPropagation();
    }
    return viewContainer;
}

// Modifies an internship's corresponding list item class based on remaining days to deadline
function updateListItemPriority(li, internship) {
    const diffDays = internship.daysRemaining;
    
    // Assigning "nearing"/"urgent" classes allows CSS to style accordingly
    if (diffDays > 3 && diffDays <= 7) {
        li.classList.add("nearing")
    } else if (diffDays <= 3 && diffDays >= 0) {
        li.classList.add("urgent");
    }
}

function createInfoContainer(internship) {
    const infoContainer = document.createElement("div");
    infoContainer.className = "role-info";
    infoContainer.innerHTML = `
        <p class="role-name">${internship.role}</p>
        <p class="role-deadline">Due: ${internship.deadline}</p>
    `;
    return infoContainer;
}

function createActionContainer() {
    const actionContainer = document.createElement("div");
    actionContainer.className = "action-container";
    // Style it so the buttons sit neatly side-by-side
    actionContainer.style.display = "flex";
    actionContainer.style.gap = "13px";
    actionContainer.style.alignItems = "center";
    actionContainer.onclick = (event) => {
        event.stopPropagation();
    }
    return actionContainer;
}

function createListItem(internship) {
    const li = document.createElement("li");
    li.className = "internship-item-container";
    
    const infoContainer = createInfoContainer(internship);
    const statusBar = createStatusBar(internship);
    const deleteButton = createDeleteButton(internship);
    const editPanel = createEditPanel(internship);
    const editButton = createEditButton(editPanel);
    const viewPanel = createViewPanel(internship);

    // Create a container for status bar, edit button, and delete button
    const actionContainer = createActionContainer();    

    // Put the action buttons INSIDE the action container
    actionContainer.appendChild(statusBar);
    actionContainer.appendChild(editButton);
    actionContainer.appendChild(deleteButton);

    // Put the containers inside the list item
    li.appendChild(infoContainer);
    li.appendChild(actionContainer);
    li.appendChild(editPanel);
    li.appendChild(viewPanel);

    updateListItemPriority(li, internship);

    li.onclick = () => {
        viewPanel.classList.toggle("hidden");
    }

    return li;
}

export function createListGroups(groupedList) {
    for(const company in groupedList) {
        const groupContainer = document.createElement("div");
        groupContainer.className = "company-group"
        groupContainer.innerHTML = `<header class="group-header"><h3>${company}</h3> <span class="role-count">Total Roles: ${groupedList[company].length}</span></header>`
        const rolesList = document.createElement("ul");
        rolesList.id = `${company.toLowerCase()}List`;
        rolesList.className = "roles-sublist"

        groupedList[company].forEach((item) => {
            const li = createListItem(item)
            rolesList.appendChild(li);
        })

        groupContainer.appendChild(rolesList);
        const list = UI.list.listContainer;
        list.appendChild(groupContainer);
    }
}