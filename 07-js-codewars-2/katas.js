//#1    https://www.codewars.com/kata/5715eaedb436cf5606000381
function positiveSum(arr) {
    return arr.reduce((acc, a) => a > 0 ? acc + a : acc, 0)
}

//#2    https://www.codewars.com/kata/5a3e1319b6486ac96f000049
function pairs(arr) {
    let count = 0;
    for (let i = 0; i < arr.length - (arr.length % 2) - 1; i += 2) {
        if (Math.abs(arr[i] - arr[i + 1]) === 1) count++
    }
    return count;
};
//  !    num - undefind !== 1  true     !
// function pairs(array, count = 0) {
//     for (let i = 0; i < array.length; i += 2)
//         if (Math.abs(array[i] - array[i + 1]) === 1)
//             count += 1;
//     return count;
// }


//#3    https://www.codewars.com/kata/5a3e1319b6486ac96f000049function 
function maxMultiple(divisor, bound) {
    while (true) {
        if (bound % divisor === 0) return bound
        bound--
    }
}

// function maxMultiple(divisor, bound) {
//     return bound - bound % divisor
// }


//#4   https://www.codewars.com/kata/514a6336889283a3d2000001
function getEvenNumbers(numbersArray) {
    return numbersArray.filter(num => !(num % 2))
}

//#5   https://www.codewars.com/kata/514a6336889283a3d2000001
function solve(arr) {
    let res = []
    for (let i = 0; arr.length != 0; i++) {
        el = i % 2
            ? Math.min(...arr)
            : Math.max(...arr)
        arr.splice(arr.indexOf(el), 1)
        res.push(el)
    }
    return res
};

// function solve(arr) {
//     var minMax = [];
//     arr.sort((a, b) => a - b);
//     for (var i = 0, j = arr.length - 1; i <= j; i++, j--) {
//         if (i != j) minMax.push(arr[j]), minMax.push(arr[i]);
//         else minMax.push(arr[i]);
//     }
//     return minMax;
// }

//#6   https://www.codewars.com/kata/514a6336889283a3d2000001
function evenChars(string) {
    return string.length > 1 && string.length < 100
        ? string.split("").filter((el, index) => index % 2)
        : "invalid string"
}

//#7   https://www.codewars.com/kata/545a4c5a61aa4c6916000755
var gimme = function (a) {
    if (a[0] > a[1] && a[0] < a[2] || a[0] > a[2] && a[0] < a[1]) return 0
    if (a[1] > a[0] && a[1] < a[2] || a[1] > a[2] && a[1] < a[0]) return 1
    if (a[2] > a[0] && a[2] < a[1] || a[2] > a[1] && a[2] < a[0]) return 2
};

//#8   https://www.codewars.com/kata/545a4c5a61aa4c6916000755
const binaryArrayToNumber = arr => {
    return arr.reverse().reduce((acc, el, index) => acc + el * (2 ** index), 0)
};

// best way 
// const binaryArrayToNumber = arr => parseInt(arr.join(''), 2);

//#9 https://www.codewars.com/kata/585d7d5adb20cf33cb000235
function findUniq(arr) {
    num = arr.pop();
    if (arr.indexOf(num) > -1) {
        for (let i = 0; ; i++) {
            if (arr[i] !== num) return arr[i]
        }
    }
    return num
}

// best way 
// function findUniq(arr) {
//     return arr.find(n => arr.indexOf(n) === arr.lastIndexOf(n));
// }


//#10 https://www.codewars.com/kata/585d7d5adb20cf33cb000235
function decipherThis(string) {
    let arr = string.split(" ")
    return arr.map(str => {
        word = [...deUnicode(str)];
        return swapLetters(word).join("")
    }).join(" ")
};

let deUnicode = (str) => {
    char = String.fromCharCode(parseInt(str));
    letters = str.match(/[^0-9+]/g)
    return letters ? char + letters.join("") : char
}

let swapLetters = (arr) => {
    secondLetter = arr[1];
    lastLetter = arr[arr.length - 1]

    arr.splice(1, 1, lastLetter)
    arr.splice(arr.length - 1, 1, secondLetter)

    return arr
}

//      !  replace($1$4$3$2)    !
// function decipherThis(str) {
//     return str.split(" ")
//     .map(w =>
//       w.replace(/^\d+/, c => String.fromCharCode(c))
//        .replace(/^(.)(.)(.*)(.)$/, "$1$4$3$2")
//     )
//     .join(" ")
// }

//#11 https://www.codewars.com/kata/585d7d5adb20cf33cb000235
function sortArray(arr) {
    let odds = arr.filter(a => a % 2)
        .sort((a, b) => b - a)
    for (let i = 0; i < arr.length && odds.length !== 0; i++) {
        if (arr[i] % 2) {
            arr.splice(i, 1, odds[odds.length - 1])
            odds.pop()
        }
    }
    return arr
}

// *2
// var moveZeros = function (arr) {
//     var filtedList = arr.filter(function (num){return num !== 0;});
//     var zeroList = arr.filter(function (num){return num === 0;});
//     return filtedList.concat(zeroList);
//   }

