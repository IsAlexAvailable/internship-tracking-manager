export function createOption(location) {
    const option = document.createElement('option');
    option.value = location;
    option.textContent = location;
    console.log("created an option");
    return option;
}