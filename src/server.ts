import express from "express";
import { sequelize } from "./database/sequelize";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import loginRouter from "./routes/login.route";
import artigoRouter from "./routes/artigo.route";
import profileRouter from "./routes/profile.route"; // novo router perfil
import cors from "cors";

const app = express();

// Permitir todos métodos usados: GET, POST, PUT, DELETE, PATCH
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

// Rotas organizadas
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/articles", artigoRouter);
app.use("/api/v1/profile", profileRouter); 

const PORT = process.env.PORT || 8080;

const main = async () => {
  try {
    // Use force: false para preservar dados em produção
    await sequelize.sync({ force: false });
    console.log("🟢 Banco sincronizado com sucesso!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  }
};

main();
