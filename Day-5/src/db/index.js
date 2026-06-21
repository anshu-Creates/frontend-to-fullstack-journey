import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstances = await mongoose.connect(
      `${process.env.DATABASE_URI}/${DB_NAME}`,
    );
    console.log(
      `MONGODB CONNECTION SUCESSFULL !!! ${connectionInstances.connection.host}`,
    );
  } catch (error) {
    console.log(`MONGODB CONNECTION FAILED !!!`, error);
    process.exit(1);
  }
};

export default connectDB;

