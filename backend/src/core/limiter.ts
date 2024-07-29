import rateLimit from "express-rate-limit";

const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.ENV == 'TEST' ? 100 : 15, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiterMiddleware;