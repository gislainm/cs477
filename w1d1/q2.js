let db = [
    { id: 1, fname: 'John', lname: 'Smith' },
    { id: 2, fname: 'Lucy', lname: 'Jark' },
    { id: 3, fname: 'Edward', lname: 'Capton' }
];

class Student {
    constructor(id, firstname, lastname) {
        this.id = id;
        this.fname = firstname;
        this.lname = lastname;
    }

    save() {
        let newObj = {};
        newObj.id = this.id;
        newObj.fname = this.fname;
        newObj.lname = this.lname;
        db.push(newObj);
    }

    edit() {
        let student = db.find(item => item.id == this.id)
        if (student) {
            student.id = this.id
            student.fname = this.fname
            student.lname = this.lname;
        } else {
            throw new Error("this student is not in the database");
        }
    }

    static getById(id) {
        let student = db.find(item => item.id == id);
        console.log(student);
    }

    static getAll() {
        console.log(db);
    }

    static deleteById(id) {
        db.splice(db.findIndex(item => item.id == id), 1)
    }
}

new Student(4, 'Tina', 'Xing').save(); //save to db
new Student(4, 'Miss', 'Xing').edit() //edit studentId with id=4
Student.deleteById(4); //remove studentId=4 from db
Student.getAll(); //return db;
Student.getById(1); //return {id:1, fname: 'John', lname: 'Smith'}