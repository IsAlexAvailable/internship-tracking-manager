export class Internship {
    #company;
    #role;
    #deadline;
    #status;
    #location;
    #jdlink;
    #notes;
    #_id;
    #datecreated

    // Returns true if the fields are valid for an Internship
    static validate(data) {
        return (data.company.trim() !== "" && data.role.trim() !== "" && data.deadline.trim() !== "");
    }

    constructor(data = {}) {
        if (!Internship.validate(data)) {
            throw new Error("Cannot create new internship. Company, role, and deadline are required.");
        }
        this.company = data.company;
        this.role = data.role;
        this.deadline = data.deadline;
        this.status = data.status || "";
        this.location = data.location || "";
        this.jdlink = data.jdlink || "";
        this.notes = data.notes || "";
        // prioritize database id format, 
        this.id = data._id || String(data.id) || String(Date.now());
        this.datecreated = data.datecreated || Date.now();
    }

    // used by JSON.stringify to convert this object to a JSON object
    toJSON() {
        return {
            id: this.id,
            company: this.company,
            role: this.role,
            deadline: this.deadline,
            status: this.status,
            location: this.location,
            jdlink: this.jdlink,
            notes: this.notes,
            datecreated : this.datecreated
        };
    }
    
    // TODO: add validation to setters
    set id(newID) {
        this.#_id = newID;
    }

    set datecreated(date) {
        const processedDate = Number(date);

        // input date is an invalid format so just stamp datecreated as now
        if (isNaN(processedDate)) {
            this.#datecreated = Date.now();
        } else {
            this.#datecreated = processedDate;
        }
    }

    set company(newCompany) {
        this.#company = newCompany;
    }

    set role(newRole) {
        this.#role = newRole;
    }

    set deadline(newDeadline) {
        this.#deadline = newDeadline;
    }

    set status(newStatus) {
        this.#status = newStatus;
    }

    set jdlink(newJDLink) {
        this.#jdlink = newJDLink;
    }

    set location(newLocation) {
        this.#location = newLocation;
    }

    set notes(newNotes) {
        this.#notes = newNotes;
    }

    get id() {
        return this.#_id;
    }

    get company() {
        return this.#company;
    }

    get datecreated() {
        return this.#datecreated;
    }

    get role() {
        return this.#role;
    }

    get deadline() {
        return this.#deadline;
    }

    get status() {
        return this.#status;
    }

    get location() {
        return this.#location;
    }

    get jdlink() {
        return this.#jdlink;
    }

    get notes() {
        return this.#notes;
    }

    // Returns a string summary of this internship
    get summary() {
        return `${this.role} at ${this.company}`;
    }

    // Returns the days left until the deadline
    get daysRemaining() {
        // deadline - current time
        const diff = new Date(this.deadline) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
}