import { Router } from "express";
import { login, register, logout, userProfile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { rateLimit } from "express-rate-limit";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";

const loginMessage = "Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.";
const userMessage = "Demasiadas peticiones. Intenta de nuevo más tarde.";
const createUserMessage = "Solo puedes crear 2 cuentas por día.";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minuto
  max: 5, //5 peticiones por minuto
  message: loginMessage,
});

const userLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1 hora
  max: 10, //10 peticiones por hora
  message: userMessage,
});

const createUserLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, //1 día
  max: 4, //2 peticiones por día
  message: createUserMessage,
});

const router = Router();

router.post("/register", createUserLimiter,validateSchema(registerSchema), register);
router.post("/login", loginLimiter,validateSchema(loginSchema) ,login);
router.post("/logout", logout);

router.get("/userProfile", authRequired, userProfile);

export default router;