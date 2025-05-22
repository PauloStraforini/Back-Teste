import { Router } from "express";
import { Error, ValidationError } from "sequelize";
import { Post } from "../database/schema";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const post = await Post.create({ email, password });
    return void res.status(201).json(post);
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return void res.status(400).json({
        message: "Validation Error",
        errors: error.errors.map((err) => err.message),
      });
    }

    if (
      error instanceof Error &&
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return void res.status(400).json({ message: "User not found" });
    }

    return void res.status(500).json({ message: "Internal server error" });
  }
});