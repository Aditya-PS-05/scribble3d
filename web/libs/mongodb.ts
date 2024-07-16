import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectMongoDB = async () => {
    const uri = process.env.DATABASE_URI;

    if (!uri) {
        console.error("DATABASE_URI is not defined");
        process.exit(1); // Exit process with failure
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectMongoDB;
