// routes/login.route.ts
import { Router } from "express"
import bcrypt from "bcrypt"
import { User } from "../database/schema"

const router = Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" })
  }

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    return res.json({ message: "Login realizado com sucesso", user: { id: user.id, email: user.email } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
})

export default router
