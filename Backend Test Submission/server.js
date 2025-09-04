import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import shortUrlRoutes from "./routes/shorturl.js";
import { Log } from "../LoggingMiddleware/logger.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urlShortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(async (req, res, next) => {
  await Log("backend", "info", "request", `${req.method} ${req.url}`);
  next();
});

app.use("/shorturls", shortUrlRoutes);
app.use("/", shortUrlRoutes);

app.get("/", async (req, res) => {
  await Log("backend", "info", "health", "Server running fine");
  res.send("URL Shortener Backend Running ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await Log(
    "backend",
    "info",
    "server",
    `Server running at http://localhost:${PORT}`
  );
  console.log(`Server running at http://localhost:${PORT}`);
});
