// #1   http://www.codewars.com/kata/opposite-number
function opposite(number) {
    return number >= 0
        ? Number('-' + number)
        : Number(number.toString().slice(1));
}
// best way:
// function opposite(number) {
//     return -number;
// }

// #2   http://www.codewars.com/kata/basic-mathematical-operations
function basicOp(op, v1, v2) {
    switch (op) {
        case '+': return v1 + v2; break;
        case '-': return v1 - v2; break;
        case '/': return v1 / v2; break;
        case '*': return v1 * v2; break;
    }
}

// best way:            !   eval()  !
// function basicOp(op, v1, v2) {
//     eval(v1 + op + v2);
// }


// #3   http://www.codewars.com/kata/printing-array-elements-with-comma-delimiters
function printArray(array) {
    return array.join(',');
}

// best way:
// function printArray(array){
//     return array.join();
// }


// #4   http://www.codewars.com/kata/transportation-on-vacation
function rentalCarCost(d) {
    if (d >= 7) {
        return d * 40 - 50;
    } else if (d >= 3) {
        return d * 40 - 20;
    } else {
        return d * 40;
    }
}

// #5   http://www.codewars.com/kata/calculating-with-functions
{
    let one = (arg) => digit(1, arg);
    let two = (arg) => digit(2, arg);
    let three = (arg) => digit(3, arg);
    let four = (arg) => digit(4, arg);
    let five = (arg) => digit(5, arg);
    let six = (arg) => digit(6, arg);
    let seven = (arg) => digit(7, arg);
    let eight = (arg) => digit(8, arg);
    let nine = (arg) => digit(9, arg);
    let zero = (arg) => digit(0, arg);

    let digit = (int, arg) => arg ? eval(`Math.floor(${int}${arg})`) : int;

    let plus = (int) => `+${int}`;
    let minus = (int) => `-${int}`;
    let times = (int) => `*${int}`;
    let dividedBy = (int) => `/${int}`;
}

// best way
// function nine(operator) {
//     return operator ? operator(9) : 9;
// }
// function plus(rightVal) {
//     return function (leftVal) {
//         return leftVal + rightVal;
//     }
// }

// #6   http://www.codewars.com/kata/get-the-middle-character
function getMiddle(s) {
    i = Math.floor((s.length - 1) / 2);
    c = (s.length - 1) % 2;
    return s.slice(i, 1 + i + c);
}

// #7   http://www.codewars.com/kata/partition-on
function partitionOn(pred, items) {
    t = items.filter(i => pred(i));
    f = items.filter(i => !pred(i));
    items.splice(0, items.length, ...(f.concat(t)));
    return f.length;
}

// #8   http://www.codewars.com/kata/partition-on - 404
// (https://www.codewars.com/kata/570cc83df616a85944001315)
function countWords(str) {
    arr = str.replace(/\s/g, " ").replace(/ +/g, " ").trim().split(" ")
    return arr.filter(a => a).length
}


// #9   https://www.codewars.com/kata/find-the-odd-int/
function findOdd(A) {
    let ob = {};
    for (let a of A) {
        if (ob[a]) {
            ob[a]++
        } else {
            ob[a] = 1
        }
    }
    for (let o in ob) {
        if (ob[o] % 2 == 1) {
            return parseInt(o);
        }
    }
}

// best way         !   ^   !
//   const findOdd = (xs) => xs.reduce((a, b) => a ^ b); xor a^a=0 v^0=v


// #10  https://www.codewars.com/kata/find-the-parity-outlier
function findOutlier(int) {
    let remain = (i) => Math.abs(i % 2);
    let getOutliner = (i, j, k) => remain(i) == remain(k) ? j : i;

    if (remain(int[0]) != remain(int[1])) {
        return getOutliner(int[0], int[1], int[2]);
    }

    for (let i = 2; i < int.length; i++) {
        if (!remain(int[i - 1]) == remain(int[i])) {
            return getOutliner(int[i - 1], int[i], int[i - 2]);
        }
    }
}

// best way                 !   filter()    !
// function findOutlier(int) {
//     var even = int.filter(a => a % 2 == 0);
//     var odd = int.filter(a => a % 2 !== 0);
//     return even.length == 1 ? even[0] : odd[0];
// }

// #11  https://www.codewars.com/kata/zipwith
function zipWith(fn, a0, a1) {
    l = Math.min(a0.length, a1.length);
    arr = [];
    for (let i = 0; i < l; i++) {
        arr[i] = fn(a0[i], a1[i]);
    }
    return arr;
}
// best way          !   Array.from()   !
// function zipWith(fn,a0,a1) {
//     return Array.from({length: Math.min(a0.length, a1.length)}, (_, i) => fn(a0[i], a1[i]));
// }


// #12 https://www.codewars.com/kata/filter-the-number
// --------


// #13 https://www.codewars.com/kata/n-th-fibonacci
function nthFibo(n) {
    if (n == 0) return 0;
    f = [0, 1];
    for (let i = 2; i < n; i++) {
        f[i] = f[i - 2] + f[i - 1];
    }
    return f[n - 1];
}

// best way             !   recursion    !
//   function nthFibo(n) {
//     return n < 2 ? 0 : n == 2 ? 1 : nthFibo(n-1) + nthFibo(n-2);
//   }

//   function nthFibo(n) {
//     let [prev, curr] = [0, 1];
//     for (let i = 1; i < n; i++) [prev, curr] = [curr, prev + curr];
//     return prev;
//   }

//   const nthFibo = n =>
//   Math.round(((1 + 5 ** .5) / 2) ** --n / 5 ** .5);



// #14  https://www.codewars.com/kata/cat-and-mouse-2d-version/
// feel shame but do not want to refactor
function catMouse(map, moves) {
    arr = map.split("\n");
    rowC = -1;
    rowM = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf("C") > -1) {
            colC = arr[i].indexOf("C");
            rowC = i
        }
        if (arr[i].indexOf("m") > -1) {
            colM = arr[i].indexOf("m");
            rowM = i
        }
    }
    if (rowC == -1 || rowM == -1) {
        return "boring without two animals"
    }
    steps = Math.abs(rowC - rowM) + Math.abs(colC - colM);
    return steps <= moves ? "Caught!" : "Escaped!"
}
// best way
// const catMouse = (map, moves) =>
//     ((l, c, m) =>
//         ~c * ~m 
//         ? Math.abs(c % l - m % l) + Math.abs((c / l ^ 0) - (m / l ^ 0)) > moves 
//             ? `Escaped!` 
//             : `Caught!` 
//         : `boring without two animals`
//     )(map.indexOf(`\n`) + 1, map.indexOf(`C`), map.indexOf(`m`));


// #15  https://www.codewars.com/kata/duplicate-encoder
function duplicateEncode(word) {
    let ob = {}
    for (let char of word) {
        char = char.toLowerCase()
        ob[char] ? ob[char]++ : ob[char] = 1;
    }
    str = []
    for (let char of word) {
        char = char.toLowerCase()
        ob[char] > 1 ? str.push("\)") : str.push("\(")
    }
    return str.join("");
}

// best way             !   ndexOf() == lastIndexOf()   !
//   function duplicateEncode(word){
//     return word
//       .toLowerCase()
//       .split('')
//       .map( function (a, i, w) {
//         return w.indexOf(a) == w.lastIndexOf(a) ? '(' : ')'
//       })
//       .join('');
//   }

// #16  https://www.codewars.com/kata/5693239fb761dc8670000001
function findAdditiveNumbers(num) {
    let getFirst = (count, num) => num.slice(0, 1 + count);

    let getSecond = (first, num) => {
        half = Math.ceil(num.length / 2);
        for (let i = 1; i < half; i++) {
            second = num.slice(first.length, first.length + i)
            summ = eval(`${first}+${second}`).toString()
            if (num.slice(first.length + second.length).startsWith(summ)) {
                return second;
            }
        }
    }

    let finish = (num, num1, num2) => {
        arr = [num1, num2];
        for (let i = 2; arr.join("").length < num.length; i++) {
            arr.push(arr[i - 2] + arr[i - 1])
        }
        return arr.join("") == num ? arr.map(String) : "";
    }

    half = Math.ceil(num.length / 2);
    for (let i = 0; i < half; i++) {
        n1 = getFirst(i, num);
        n2 = getSecond(n1, num);
        if (n2) {
            res = finish(num, parseInt(n1), parseInt(n2))
            if (res) return res
            else continue
        }
    }
    return []
}

// #17  https://www.codewars.com/kata/576757b1df89ecf5bd00073b
function towerBuilder(nFloors) {

    let addStars = (n, arr) => {
        for (let i = 0; i < n + (n - 1); i++) {
            arr.push("*")
        }
    }

    let addSpaces = (n, nFloors, arr) => {
        for (let i = 0; i < nFloors - n; i++) {
            arr.unshift(" ")
            arr.push(" ")
        }
    }

    let makeFloor = (i, nFloors) => {
        f = []
        addStars(i, f);
        addSpaces(i, nFloors, f);
        return f.join("")
    }

    tower = [];
    for (let i = 1; i <= nFloors; i++) {
        tower.push(makeFloor(i, nFloors))
    }

    return tower
}

// best way                  !   .repeat()  !
//   function towerBuilder(n) {
//     return Array.from({length: n}, function(v, k) {
//       const spaces = ' '.repeat(n - k - 1);
//       return spaces + '*'.repeat(k + k + 1) + spaces;
//     });
//   }

// #18  https://www.codewars.com/kata/58f5c63f1e26ecda7e000029
function wave(str) {
    res = []
    for (let i = 0; i < str.length; i++) {
        arr = str.split("")
        if (arr[i] !== " ") {
            arr.splice(i, 1, str[i].toUpperCase())
            res.push(arr.join(""))
        }
    }
    return res
}

//                            !  regex.test()   !
// function wave(str){
//     let result = [];
//     str.split("").forEach((char, index) => {
//         if (/[a-z]/.test(char)) {
//             result.push(str.slice(0, index) + char.toUpperCase() + str.slice(index + 1));
//         }
//     });
//     return result;
// }

// #19 https://www.codewars.com/kata/59d398bb86a6fdf100000031
function stringBreakers(n, s) {
    str = s.replace(/[ +]/g, "");
    arr = [];
    for (let i = 0; i < str.length; i += n) {
        arr.push(str.slice(i, i + n))
    }
    return arr.join("\n");
}

// #20  https://www.codewars.com/kata/514a024011ea4fb54200004b
function domainName(url) {
    return url.replace(/https:\/\/www.|http:\/\/www.|http:\/\/|https:\/\/|www./, "").split(".")[0];
}