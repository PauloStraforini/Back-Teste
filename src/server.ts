import express from "express";
import { sequelize } from "./database/sequelize";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import loginRouter from "./routes/login.route";

import cors from "cors";

const app = express();
app.use(cors({ origin: "*", methods: ["POST", "GET"] })); 
app.use(express.json());


app.use("/api/v1", loginRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

const PORT = process.env.PORT || 8080;

const main = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log("🟢 Banco sincronizado com sucesso!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  }
};

main();
