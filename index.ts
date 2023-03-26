import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db";
import morgan from "morgan";
import userRouter from "./routes/userRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
dbConnection();

app.use(express.json());

app.use("/api/users", userRouter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//start
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
