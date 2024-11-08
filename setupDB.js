const {Sequelize} = require('sequelize');

let seqInstance = null;

const createInstance = async () => {
    const instance = new Sequelize(
        'base de datos', // nombre de base de datos
        'usuario', // usuario
        'contrasenia', // contraseña
        {
            host:'127.0.0.1',
            dialect: 'mysql',
            pool: {
                max: 3
            }
        }
    );
    
    try {
        await instance.authenticate();
        console.log("Connection has been established successfully");
        return instance;
    }
    catch (error) {
        throw new Error("Unable to connect to the database:", error);
    }
}

const getSeqInstance = async () => {
    if(!seqInstance){
        seqInstance = await createInstance();
    }
    return seqInstance;
}

module.exports = {
    getSeqInstance
};