const { get } = require("../routes/studentsRoutes");
const {CAREERS_0001,CAREERS_0002,CAREERS_0003,CAREERS_0004, CAREERS_0006,CAREERS_0007} = require('../helper/errors');
const { json } = require("sequelize");

const requiredErrors = [CAREERS_0001,CAREERS_0002,CAREERS_0003,CAREERS_0004];

const validateBody = (req, res, next) => {
    const fieldsRequired = [req.body.firstname, req.body.lastname, req.body.dni, req.body.email];

    let uncompletedFields = [];
    for(let i=0; i<fieldsRequired.length;i++){
        if(!fieldsRequired[i]){
            uncompletedFields.push(requiredErrors[i]);
        }
    }

    if(uncompletedFields.length){
        res.status(400).json(uncompletedFields);
        return;
    }
    
    next();
}


const validateId = (req,res,next) => {
    if(isNaN(Number(req.params.id))) {
        res.status(400).json(CAREERS_0006);
        return;
    }

    req.params.id = Number(req.params.id);
    
    next();
};

const validateNumberPagination = (req,res,next) => {
    if(isNaN(Number(req.params.currentPage)) || isNaN(Number(req.params.pageSize)) ||
        Number(req.params.currentPage) <= 0 || Number(req.params.pageSize) <= 0) {
        res.status(400).json(CAREERS_0007);
        return;
    }

    req.params.currentPage = Number(req.params.currentPage);
    req.params.pageSize = Number(req.params.pageSize);

    next();
}

module.exports = {
    validateId,
    validateBody,
    validateNumberPagination
}