const {Student} = require('../model/student');
const {CAREERS_0005, CAREERS_0006} = require('../helper/errors');

const findStudents = async () => {
    try {
        const students = await Student.getAll();
        return students;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

const findbyId = async (id) => {
    try {
        const student = await Student.getById(id) ?? {//TODO mover a router
            message: 'invalid id'
        };
        return student;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

const findWithPagination = async (search, currentPage, pageSize) => {
    try {
        const students = await Student.getWithPagination(search, currentPage, pageSize);
        return students;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addStudent = async (student) => {
    try{
        const newStudent = await Student.add(student);
        return showStudent(newStudent);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

const removeStudent = async (id) => {
    try{
        const deleted = await Student.remove(id);//TODO mover a router
        return deleted ? {
            message: `id ${id} deleted`
        }:{
            CAREERS_0006
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

const showStudent = (student) => {
    return student ? {
        id: student.id,
        firstname : student.firstname,
        lastname : student.lastname
    } : CAREERS_0005;
}

module.exports = {
    findStudents,
    findbyId,
    findWithPagination,
    addStudent,
    removeStudent,
};