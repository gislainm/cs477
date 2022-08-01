"use strict";
/*eslint-disable */
class Person {
    constructor(name = 'John') {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}

exports = new Person('Bella');

