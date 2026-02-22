export class Internship {
    #company;
    #role;
    #deadline;
    #status;
    #location;
    #jdlink;
    #notes;
    #id;

    // Returns true if the fields are valid for an Internship
    static validate(company, role, deadline, jdLink, notes) {
        // TODO: add to validation
        return (company.trim() !== "" && role.trim() !== "" && deadline.trim() !== "");
    }

    constructor(company, role, deadline, status, location="",jdLink="", notes="", id=Date.now()) {
        this.company = company;
        this.role = role;
        this.deadline = deadline;
        this.status = status;
        this.location = location;
        this.jdlink = jdLink;
        this.notes = notes;
        this.id = id;
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
            jdLink: this.jdlink,
            notes: this.notes
        };
    }
    
    // TODO: add validation to setters
    set id(newID) {
        this.#id = newID;
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
        return this.#id;
    }

    get company() {
        return this.#company;
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