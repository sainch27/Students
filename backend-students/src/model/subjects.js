const { DataTypes, Model, QueryTypes, Op } = require("sequelize");

class Subject extends Model {
    static init = (sequelize) => {
        super.init({
            idsubject:{
                type: DataTypes.NUMBER,
                autoIncrement: true,
                primaryKey: true,
            }
        })

    }
}