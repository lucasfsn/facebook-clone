import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_SECRET: str(),
  CLOUDINARY_API_KEY: str(),
  JWT_SECRET: str(),
  CLIENT_URL: str(),
});
