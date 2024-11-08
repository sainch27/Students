const express = require('express');
const {findStudents, findbyId, addStudent, removeStudent, findWithPagination} = require('../services/studentsServices');
const {validateId, validateBody, validateNumberPagination} = require('../middleware/studentsMiddleware');


const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const students = await findStudents();
        res.json(students);
    }
    catch(error){
        res.sendStatus(500);
    }
});

router.get('/:id', validateId, async (req, res) => {
    try {
        const students = await findbyId(req.params.id);
        res.json(students);
    }
    catch(error){
        res.sendStatus(500);
    }
});

router.get('/:currentPage/:pageSize', validateNumberPagination,async (req, res) => {
    try {
        const students = await findWithPagination("", req.params.currentPage, req.params.pageSize);
        console.log(req.params);
        res.json(students);
    } catch (error) {
        res.sendStatus(500);
    }
})

router.get('/:search/:currentPage/:pageSize', validateNumberPagination,async (req, res) => {
    try {
        const students = await findWithPagination(req.params.search, req.params.currentPage, req.params.pageSize);
        console.log(req.params);
        res.json(students);
    } catch (error) {
        res.sendStatus(500);
    }
})

router.post('/', validateBody, async (req, res) => {
    try{
        const newStudent = await addStudent(req.body);
        if(newStudent.message){
            res.status(400).json(newStudent);
        }else{
            res.json(newStudent);
        }
    }
    catch(error){
        console.log('hola')
        res.sendStatus(500);
    }
});

router.delete('/:id', validateId, async (req, res) => {
    try{
        const removed = await removeStudent(req.params.id);
        res.json(removed);
    }
    catch(error){
        res.sendStatus(500);
    }
})

module.exports = router;