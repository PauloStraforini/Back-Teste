import express, { Request, Response } from "express";
import { Artigo } from "../models/artigo";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { banner, title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Título e texto são obrigatórios." });
    }

    const newArtigo = await Artigo.create({ banner, title, content });
    return res.status(201).json(newArtigo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao criar artigo." });
  }
});

export default router;