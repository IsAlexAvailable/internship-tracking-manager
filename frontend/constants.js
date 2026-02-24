
export const UI = {
    form : {
        company : document.getElementById('companyInput'),
        role : document.getElementById('roleInput'),
        deadline : document.getElementById('deadline'),
        location : document.getElementById('locationInput'),
        jdlink : document.getElementById('jobDescriptionInput'),
        notes : document.getElementById('notesInput'),
        status : document.getElementById('statusSelect')
    },
    list : {
        addButton : document.getElementById('addButton'),
        clearAllButton : document.getElementById('clearAllButton'),
        totalResults : document.getElementById('totalResults'),
        NO_RESULTS : document.getElementById('noResults'),
        sortContainer : document.getElementById('results-header'),
        listContainer : document.getElementById('internshipList')
    },
    filters : {
        search : document.getElementById('search'),
        sort : document.getElementById('sortSelect')
    },
    title : document.getElementById('title')
}

export const STATUS_OPTIONS = {
    NOT_APPLIED : "not applied",
    APPLIED : "applied",
    INTERVIEW : "interview",
    OFFER : "offer",
    REJECTED : "rejected"
}

export const MESSAGES = {
    CONFIRM_DELETE : "Are you sure you want to delete this internship?",
    CONFIRM_CLEAR_ALL : "Are you sure you want to clear all internships?"
}

export const API_URL = "http://localhost:3000/api/internships";

export const APP_NAMES = {
    TITLE : "Internship Tracker"
}