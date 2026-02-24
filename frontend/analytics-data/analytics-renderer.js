import { getFilteredList } from "./analytics-logic.js";
import { addLocationOptions } from "./analytics-logic.js";

export function renderStats() {
    addLocationOptions();
    const filteredList = getFilteredList();
}



