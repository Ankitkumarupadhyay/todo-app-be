"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let memoryInstance = null;
const connectDB = async () => {
    try {
        const connStr = process.env.MONGODB_URI;
        if (connStr) {
            const conn = await mongoose_1.default.connect(connStr);
            console.log(`MongoDB Connected: ${conn.connection.host} / Database: ${conn.connection.name}`);
            return;
        }
        // Dev In-Memory MongoDB Fallback only when MONGODB_URI is completely unconfigured
        console.log('MONGODB_URI not provided. Starting temporary in-memory MongoDB instance...');
        memoryInstance = await mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = memoryInstance.getUri();
        const conn = await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB Connected (In-Memory Fallback): ${conn.connection.host}`);
    }
    catch (error) {
        const err = error;
        console.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};
exports.default = connectDB;
