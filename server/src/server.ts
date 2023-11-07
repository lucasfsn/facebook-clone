import mongoose from 'mongoose';
import app from './app';
import env from './utils/validateEnv';

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Mongoose connected');

    app.listen(port, 'localhost', () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
