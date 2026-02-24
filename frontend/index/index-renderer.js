import { createListGroups, toggleVisibilities } from "./index-components.js";
import {getSearchFilteredList, getSortedList, groupInternshipByCompany } from "./index-logic.js";
import { UI, APP_NAMES } from "../constants.js";

// Renders changes to internship list
export function renderList() {
    UI.title.textContent = APP_NAMES.TITLE;
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