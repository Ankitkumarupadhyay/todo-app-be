import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryInstance: MongoMemoryServer | null = null;

const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGODB_URI;
    
    if (connStr) {
      const conn = await mongoose.connect(connStr);
      console.log(`MongoDB Connected: ${conn.connection.host} / Database: ${conn.connection.name}`);
      return;
    }

    // Dev In-Memory MongoDB Fallback only when MONGODB_URI is completely unconfigured
    console.log('MONGODB_URI not provided. Starting temporary in-memory MongoDB instance...');
    memoryInstance = await MongoMemoryServer.create();
    const mongoUri = memoryInstance.getUri();
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected (In-Memory Fallback): ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
