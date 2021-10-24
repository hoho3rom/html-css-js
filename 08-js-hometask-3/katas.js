// _________TASK 1__________
// Create a function to access the properties of an object.
const user = {
    username: 'testuser1',
    preferences: {
        sound: {
            maxValue: 50,
            value: 30,
        },
    },
};
const randomValue = Math.random();
const nullValue = null;

// solution
function findProp(obj, properties) {
    if (!obj) {
        return null
    }
    if (properties.length < 2) {
        return obj.hasOwnProperty(properties[0]) ? obj[properties[0]] : null
    } 
    return findProp(obj[properties.pop()], properties)
}

function pluck(obj, prop = "") {
    let properties = prop.split(".").reverse()
    return findProp(obj, properties)
}

// check list
console.log(pluck(user, 'preferences')); // 30
console.log(pluck(user, 'preferences.sound.value')); // 30
console.log(pluck(user, 'unknown.key')); // null
console.log(pluck(randomValue, 'unknown.key')); // null
console.log(pluck(nullValue, 'unknown.key')); // null
console.log(pluck(nullValue)); // null


//_________TASK 2__________
//Create custom deep clone function.
const user = {
    username: 'testuser1',
    preferences: {
        sound: {
            maxValue: 50,
            value: 30,
        },
        color: ["red", "green"],
        size: 3,
    },
};


// solutions
//#1
const v8 = require('v8');
const clone = obj => v8.deserialize(v8.serialize(obj));

//#2
let clone = (obj) => JSON.parse(JSON.stringify(obj));

//#3
let clone = (object) => {
    newObj = {}
    for (let entry of Object.entries(object)) {
        addProp(newObj, entry[0], entry[1])
    }
    return newObj
}

let addProp = (obj, key, value) => {
    if (typeof value !== 'object') {
        obj[key] = value
    } else {
        obj[key] = {}
        for (let entry of Object.entries(value)) {
            addProp(obj[key], entry[0], entry[1])
        }
    }
}

// check
const clonedUser = clone(user);
clonedUser.preferences.sound.maxValue = 70;

console.log(user.preferences.sound.maxValue === clonedUser.preferences.sound.maxValue); // false
console.log(user.preferences === clonedUser.preferences); //false
console.log(user === clonedUser); //false


//_________TASK 3__________
//Create a function that returns how long ago a certain day was.
let today = moment('23/02/2021 14:00:00', "DD/MM/YYYY hh:mm:ss");

// solution
let offset = (from) => {
    let metrics = ["days", "hours", "minutes"];
    metric = metrics.find(m => today.diff(from, m) >= 1)
    res = today.diff(from, metric);
    return res === 1 ? `${res} ${metric.slice(0, -1)} ago` : `${res} ${metric} ago`
}

// check
// E.g. Today is 23.02.2021, 14:00:00
console.log(offset(moment('23/02/2021 13:30:00', 'DD/MM/YYYY hh:mm:ss'))); // 30 minutes ago
console.log(offset(moment('23/02/2021 13:00:00', 'DD/MM/YYYY hh:mm:ss'))); // 1 hour ago
console.log(offset(moment('23/02/2021 11:30:00', 'DD/MM/YYYY hh:mm:ss'))); // 2 hours 30 minutes ago
console.log(offset(moment('22/02/2021 14:00:00', 'DD/MM/YYYY hh:mm:ss'))); // 1 day ago
console.log(offset(moment('23/02/2020 10:00:00', 'DD/MM/YYYY hh:mm:ss'))); // 366 days ago


//_________TASK 4__________
//Create a function that generate a random date between to dates
const date1 = moment('23/01/2021', 'DD/MM/YYYY');
const date2 = moment('23/02/2021', 'DD/MM/YYYY');

// solution
let randomDate = (date1, date2) => {
    let metric = "days";
    let diff = date2.diff(date1, metric);
    let random = Math.floor(Math.random() * (diff + 1));
    return date1.add(random, metric)
}

// check
console.log(randomDate(date1, date2).format('DD/MM/YY'));


//#5 Merged Objects https://www.codewars.com/kata/merged-objects
function objConcat(o) {
    let res = {}
    o.forEach(obj => Object.assign(res, obj))
    return res
}

// best way
// function objConcat(objects) {
//     return Object.assign({}, ...objects);
// }

// #6 "this" is an other problem https://www.codewars.com/kata/547f1a8d4a437abdf800055c
function NamedOne(first, last) {
    this._f = first, this._l = last, this._fl = first + ' ' + last
    writable: true;
    Object.defineProperty(this, "firstName", {
        get() { return this._f },
        set(newValue) {
            this._f = newValue;
            this._fl = this._fl.replace(this._fl.split(" ")[0], this._f)
        }
    });
    Object.defineProperty(this, "lastName", {
        get() { return this._l },
        set(newValue) {
            this._l = newValue;
            this._fl = this._fl.replace(this._fl.split(" ")[1], this._l)
        }
    });
    Object.defineProperty(this, "fullName", {
        get() {
            _fl = this._f + ' ' + this._l
            return this._fl
        },
        set(newValue) {
            let arr = newValue.split(" ")
            if (arr.length !== 2) return
            this._fl = newValue;
            this._f = this._fl.split(" ")[0]
            this._l = this._fl.split(" ")[1]
        }
    })
}

// best way
// function NamedOne(first, last) {
//     this.firstName = first;
//     this.lastName = last;

//     Object.defineProperty(this, "fullName", {
//         set: function (value) {
//             var parts = value.split(" ");
//             if (parts.length === 2) {
//                 this.firstName = parts[0];
//                 this.lastName = parts[1];
//             }
//         },
//         get: function () {
//             return this.firstName + ' ' + this.lastName;
//         }
//     });
// }

//#8 "this" is an other solution https://www.codewars.com/kata/54834b3559e638b39d0009a2
function OnceNamedOne(first, last) {
    Object.defineProperty(this, "firstName", { value: first, writable: false })
    Object.defineProperty(this, "lastName", { value: last, writable: false })
    Object.defineProperty(this, "fullName", { value: first + ' ' + last, writable: false })
}

//best ways          !       Object.freeze     !
// function OnceNamedOne(first, last) {
//     this.firstName = first;
//     this.lastName = last;
//     this.fullName = this.firstName + ' ' + this.lastName;
//     Object.freeze(this);
// }
//                     !       Object.defineProperties     !
// function OnceNamedOne(first, last) {
//     Object.defineProperties(this, {
//         'firstName': { value: first, writable: false },
//         'lastName': { value: last, writable: false },
//         'fullName': { value: first + ' ' + last, writable: false }
//     });
// }
//                      !       writable: false - default     !
// function OnceNamedOne(first, last) {
//     Object.defineProperty(this, 'firstName', { value: first });
//     Object.defineProperty(this, 'lastName', { value: last });
//     Object.defineProperty(this, 'fullName', { value: first + ' ' + last });
// }

//#9   {get [expression]() { ... } }

//#10 
function humanReadable(seconds) {
    let hours = Math.floor(seconds / 3600);
    hours = hours.toString().length > 1 ? hours : `0${hours}`
    seconds -= hours * 3600;

    let minutes = Math.floor(seconds / 60);
    minutes = minutes.toString().length > 1 ? minutes : `0${minutes}`
    seconds -= minutes * 60;

    seconds = seconds.toString().length > 1 ? seconds : `0${seconds}`

    return `${hours}:${minutes}:${seconds}`
}

// best way
// function humanReadable(seconds) {
//     var pad = function (x) { return (x < 10) ? "0" + x : x; }
//     return pad(parseInt(seconds / (60 * 60))) + ":" +
//         pad(parseInt(seconds / 60 % 60)) + ":" +
//         pad(seconds % 60)
// }
