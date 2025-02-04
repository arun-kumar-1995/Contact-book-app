import express from "express";
const app = express();

import cors from "cors";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// import routes
import appRoute from "./routes/index.js";
app.use("/app/v1", appRoute);

// global middleware
import errorMiddleware from "./middlewares/error.middleware.js";
app.use(errorMiddleware);
export default app;
