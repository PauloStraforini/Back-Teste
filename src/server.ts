import express from "express";
import { sequelize } from "./database/sequelize";

import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import cors from "cors"; 



const app = express();
app.use(cors({origin: "*", methods:["POST"] })); // Allow requests from the React app
const PORT = 8080;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

const main = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
main();