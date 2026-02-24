import { UI } from './analytics-constants.js';
import { getInternships } from '../storage.js';
import { createOption } from './analytics-components.js';

function getUniqueLocations() {
    const internships = getInternships();
    const locations = internships.map(internship => internship.location);
    const cleanLocations = locations.filter(loc => loc && loc.trim() !== "");
    return Array.from(new Set(cleanLocations));
}

export function getFilteredList() {
    const internships = getInternships();
    const filteredList = internships.filter((internship) => {
        const selectedTime = UI.filters.time.value;
        let matchesTime = false;
        // TODO: make renderer add location options before this call
        const selectedLocation = UI.filters.location.value;
        let matchesLocation = false;
        const salaryKey = UI.filters.salary.value;
        let matchesSalary = false;

        const timeRange = UI.filters.timeOptions[selectedTime];
        matchesTime = selectedTime === "all" || internship.datecreated >= timeRange;

        matchesLocation = selectedLocation === "all" || internship.location === selectedLocation;

        const salaryThreshold = UI.filters.salaryOptions[salaryKey];
        matchesSalary = salaryThreshold === null || internship.salary >= salaryThreshold[0] && internship.salary <= salaryThreshold[1];

        return matchesTime && matchesLocation && matchesSalary;
    });

    return filteredList;
}

// TODO: normalize location data to avoid duplicate locations with different names
// dynamically adds locations options to select element based on available locations
export function addLocationOptions() {
    const locations = getUniqueLocations();

    locations.forEach(location => {
        const optionElement = createOption(location);
        UI.filters.location.appendChild(optionElement);
    });
}