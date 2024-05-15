import { Sequelize } from 'sequelize';
import config from '../../database/config/config';  

const env: string = process.env.ENVIRONMENT || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "postgres"
});

const checkDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
  
checkDatabaseConnection();

export default sequelize;