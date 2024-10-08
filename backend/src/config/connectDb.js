const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'lucy',
    'root',
    null,
    {
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql',

    }
);

const connectDb = async () => {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
}

module.exports = connectDb;