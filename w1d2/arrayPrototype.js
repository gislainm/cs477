"use strict";
/*eslint-disable */
Array.prototype.even = function () {
    return this.filter(num => num % 2 === 0);
}

Array.prototype.odd = function () {
    return this.filter(num => num % 2 !== 0);
}

// Fix the slow function to be asynchronous/non-blocking
function slow(callback) {
    if (Math.random() > 0.5) {
        return callback("Error", null)
    }
    return callback(null, { id: 12345 })
}

function exec(fn) {
    // Complete the code here to implement chaining with callback
    let obj = {};
    fn(function (err, data) {
        obj.done = function (callback) {
            if (err === null) {
                callback(data);
            }
            return this;
        },
            obj.fail = function (callback) {
                if (data === null) {
                    callback(err);
                }
                return this;
            }

    });
    return obj;
}

exec(slow).done(function (data) { console.log(data); })
    .fail(function (err) { console.log("Error: " + err); });

// console.log([1, 2, 3, 4, 5, 6, 7, 8].even());
// console.log([1, 2, 3, 4, 5, 6, 7, 8].odd());

