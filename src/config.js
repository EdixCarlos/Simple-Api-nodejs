import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.nqkx7.mongodb.net/code_society?retryWrites=true&w=majority',
  PORT: process.env.PORT || 4000,
};
