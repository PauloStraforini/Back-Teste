import { Router } from "express";
import { ValidationError } from "sequelize";
import validator from "validator";
import { Post, User } from "../database/schema";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    return void res.json(users);
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

// example user with posts
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return void res.status(404).json({ message: "User not found" });
    }

    const userWithPosts = await Post.findAll({
      where: { userId: user.id },
    });

    return void res.json(userWithPosts);
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email.trim())) {
      return void res.status(400).json({ message: "Invalid email address" });
    }

    const user = await User.create({ email, password });
    return void res.status(201).json(user);
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return void res.status(400).json({
        message: "Validation Error",
        errors: error.errors.map((err) => err.message),
      });
    }
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default router;