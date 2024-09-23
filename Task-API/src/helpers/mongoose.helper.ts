import { Mongoose } from 'mongoose';

const mongooseObj = new Mongoose();

mongooseObj.set('debug', false);

export const dbConnection = mongooseObj.createConnection(process.env.MONGO_URL!);

dbConnection.on('open', () => {
  console.log('Database connected');
});
dbConnection.on('error', (error) => {
  console.log('Database connection error', error);
});
