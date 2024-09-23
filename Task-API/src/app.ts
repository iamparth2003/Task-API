import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routes';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

app.use('/api', router);

app.use('*', (_req, res) => {
  res.status(404).send({ statusCode: 404, message: 'Route not found' });
});

app.listen(port, () => {
  return console.log(`Listening on: ${port}`);
});
