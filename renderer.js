import { createListGroups, toggleVisibilities } from "./components.js";
import {getSearchFilteredList, getSortedList, groupInternshipByCompany } from "./logic.js";
import { UI } from "./constants.js";

// Renders changes to internship list
export function renderList() {
    const list = UI.list.listContainer;
    list.innerHTML = "";

    const filteredList = getSearchFilteredList();
    const sortedList = getSortedList(filteredList);

    const groupedList = groupInternshipByCompany(sortedList);

    createListGroups(groupedList);

    const totalResults = UI.list.totalResults;
    totalResults.textContent = `Total Results: ${filteredList.length}`

    toggleVisibilities(filteredList);
}