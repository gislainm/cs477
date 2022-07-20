1. Exercise 1
```javascript 
Array.prototype.even = function () {
    return this.filter(num => num % 2 === 0);
}

Array.prototype.odd = function () {
    return this.filter(num => num % 2 !== 0);
}
console.log([1, 2, 3, 4, 5, 6, 7, 8].even());
console.log([1, 2, 3, 4, 5, 6, 7, 8].odd());
```
2. Exercise 2
    1. sometimes we need to use setImmediate instead of using setTimeout because we cannot guarantee that setTimeout will always run before setImmediate. This is because depending on the call stack sometimes the event loop calls the setImmediate function while the timer phase is still waiting for the timer to run out so the setTimeout callback function can be executed.
    2. process.nextTick is always prioritize, and it is always drained before the next phase in the event loop can be executed. Therefore, in one event loop the process.nextTick callback functions can be executed more than once and every it is executed, all the callback function available at that time are execute(drained). whereas the setImmediate callback functions are only executed once in the even loop and if more than 100 callback functions are available, only the first 100 will be executed and the rest will have to wait for the next turn of the event loop.
    3. 10 global modules/methods available in the node environment
        * setTimeout
        * setImmediate
        * setInterval
        * Promise
        * async & await
        * process.nextTick
        * onClick
        * addEventListener
        * fetch
        * URLSearchParams
    
3. Exercise 3 
```javascript
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
    .fail(function (err) { console.log("Error: " + err); })
```
     