const {getSeqInstance} = require('./setupDB');
const {Student} = require('../model/student');

const setupModel = async () => {
    const instanceDB = await getSeqInstance();
    const student = Student.init(instanceDB);
}

setupModel();