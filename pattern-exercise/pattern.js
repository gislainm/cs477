exports.firstname = 'John';
exports = {
    lastname: 'Smith'
}
module.exports = exports;

module.exports.fname = 'Edward';
module.exports.lname = 'Jark';
exports.getName = function () {
    console.log('getName');
}