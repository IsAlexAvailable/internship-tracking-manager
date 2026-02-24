export const UI = {
    filters : {
        time : document.getElementById('timeSelect'),
        timeOptions : {
            "month" : Date.now() - 2419200000,
            "3-month" : Date.now() - 7257600000,
            "year" : Date.now() - 29030400000,
        },
        salary : document.getElementById('salarySelect'),
        salaryOptions : {
            // TODO: these ranges feel weird
            "<30000" : [0, 30000],
            "30000-50000" : [30000, 50000],
            "50000-70000" : [50000, 70000],
            // This will break if the internship salary is above the upper bound, so should handle this in salary input
            ">70000" : [70000, 10000000000000],
            "select-none" : null
        },
        location : document.getElementById('locationSelect')
    }

}