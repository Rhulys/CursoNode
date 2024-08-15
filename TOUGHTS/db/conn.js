const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conectamos com Sucesso');
    } catch (error) {
        console.error('Não foi possível conectar:', error);
    }
}

testConnection();

module.exports = sequelize;
