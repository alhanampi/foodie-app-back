import mongoose, { ConnectOptions } from "mongoose";

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log("conected to mongoDB"));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnection;
