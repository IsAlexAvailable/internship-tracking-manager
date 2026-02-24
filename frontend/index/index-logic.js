import { getInternships } from "../storage.js";
import { UI } from "../constants.js";

// returns a sorted copy of a list based on the selected sorting criteria
export function getSortedList(list) {
        const sortBy = UI.filters.sort.value;

        const sortedList = list.toSorted((a, b) => {
            if (sortBy === "newest") {
                return (b.datecreated - a.datecreated);
            } else if (sortBy === "alphabetical") {
                return a.role.localeCompare(b.role) + a.company.localeCompare(b.company);
            } else if (sortBy === "deadline") {
                return (new Date(a.deadline) - new Date(b.deadline));
            } else if (sortBy === "oldest") {
                console.log(`a: ${a.datecreated} b: ${b.datecreated}`)
                return (a.datecreated - b.datecreated);
            } else if (sortBy === "alphabetical-reverse") {
                return (-1*(a.role.localeCompare(b.role) + a.company.localeCompare(b.company)));
            } else if (sortBy === "deadline-reverse") {
                return (-1*(new Date(a.deadline) - new Date(b.deadline)));
            }
        });
        return sortedList;
}

// returns a search-filtered copy of internships
export function getSearchFilteredList() {
    let filteredList;
    const searchInput = UI.filters.search.value;

    if (searchInput.trim() === "") { filteredList = getInternships(); }
    else {
        filteredList = getInternships().filter((item) => {
            const companyStr = item.company.toLowerCase();
            const roleStr = item.role.toLowerCase();
            const searchStr = searchInput.trim().toLowerCase();
            return (companyStr.includes(searchStr) || roleStr.includes(searchStr));
        });
    }
    return filteredList;
}

// creates a list of company groups, which contain corresponding internships, from internship list
export function groupInternshipByCompany(list) {
    // reduce takes a function which takes an accumulator (groups dictionary) and current element (internship) and an initial value for acc
    const newList = list.reduce((groups, item) => {
        const company = item.company;
        // create a new company key
        if (!groups[company]) {
            groups[company] = [];
        }
        groups[company].push(item);
        return groups;
    }, {})
    return newList;
}