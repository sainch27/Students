const { DataTypes, Model, QueryTypes, Op } = require("sequelize");

class Student extends Model {
    static init = (sequelize) => {
        super.init(
            {
                id:{
                    type: DataTypes.NUMBER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                sid: {
                    type: DataTypes.NUMBER,
                    allowNull: false
                },
                firstname: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lastname: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                dni: {
                    type: DataTypes.NUMBER,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                deleted: {
                    type: DataTypes.TINYINT,
                    values: [0,1],
                    defaultValue: 0
                }
            },
            {
                sequelize,
                modelName: "students",
            }
        );
        return this;
    };

    static getAll = async () => {
        return await this.findAll({
            where: {
                deleted: 0
            },
            attributes: {
                exclude: 'deleted, createdAt, updatedAt'
            }
        });
    }

    static getWithPagination = async (search, currentPage, pageSize) => {
        const offset = (currentPage - 1) * pageSize;
        console.log(offset);
        return await this.findAndCountAll({
            where: {
                [Op.or]: [
                    {firstname: {[Op.like]:`${search}%`}},
                    {lastname: {[Op.like]:`${search}%`}}
                ],
                deleted: 0
            },
            attributes: {
                exclude: 'deleted, createdAt, updatedAt'
            },
            limit: pageSize,
            offset: offset
        });
    };

    static getById = async (id) => {
        return await this.findOne({
            where: {
                id: id,
                deleted: 0
            },
            attributes:{
                exclude: "deleted,createdAt,updatedAt"
            }
        });
    };

    static add = async (student) => {
        const repeated = await this.findOne({
            where: {
                deleted: 0,
                [Op.or]: [{dni: student.dni},
                    {email: student.email}]
            },
            attributes: {
                exclude: "deleted,createdAt,updatedAt"
            }
        })
        
        if(!repeated) {
            const lastsid1 = await this.max('sid');

            return this.create({
                sid: lastsid1 + 1,
                firstname: student.firstname,
                lastname: student.lastname,
                dni: student.dni,
                email: student.email
            });
        }
        return null;
    };

    static remove = async (toDeleteId) => {
        let removed = await this.update({deleted:1}, {
            where:{
                deleted: 0,
                id: toDeleteId
            }
        });
        removed = !removed[0] ? false : true;
        return removed;
    };
};

module.exports = {
    Student
}