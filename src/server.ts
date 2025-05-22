import express from "express";
import { sequelize } from "./database/sequelize";

import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

const main = async () => {
  try {
    // await sequelize.sync(); // Sincroniza la base de datos
    // await sequelize.sync({ force: true }); // Sincroniza la base de datos y elimina los datos existentes
    await sequelize.sync({ alter: true }); // Sincroniza la base de datos y modifica las tablas existentes
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
main();