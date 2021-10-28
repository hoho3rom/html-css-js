// #1 Error Throwing - Error Handling #2 https://www.codewars.com/kata/55e7650c8d894146be000095/javascript
function validateMessage(msg) {
    if (msg === null) {
        throw new ReferenceError('Message is null!')
    }
    if (typeof msg !== 'string') {
        throw new TypeError(`Message should be of type string but was of type ${typeof msg}!`)
    }
    if (msg.length > 255 || msg.length <= 0) {
        throw new RangeError(`Message contains ${msg.length} characters!`)
    }
    if (msg.includes("<") && msg.includes(">")) {
        return false
    }
    return true
}

// #2 Jokes you've been 'awaiting' for ... promise https://www.codewars.com/kata/5a353a478f27f244a1000076
function sayJoke(url, jokeId) {
    return fetch(url)
        .then(async response => {
            let data = await response.json().then(data => data);
            if (!data.jokes) {
                return Promise.reject(new Error(`No jokes at url: ${url}`))
            }
            let joke = data.jokes.find(joke => jokeId === joke.id)
            if (!joke) {
                return Promise.reject(new Error(`No jokes found id: ${jokeId}`))
            }
            return {
                saySetup() { return joke.setup },
                sayPunchLine() { return joke.punchLine },
            }
        })
}

// #3
// You need to create an interval to display the number of seconds that have passed
// since the program was started to the console.
// ‘Elapsed time: 1 sec’
// ‘Elapsed time: 2 sec’ ... etc.
// Write the program in that way it stops when reaching 5 seconds 
// and the elapsed time is no longer displayed on the console.

var id = setInterval(callback, 1000);
b = 1
function callback() {
    console.log(`Elapsed time: ${b++} sec`)
    if (b > 5) clearInterval(id)
}

