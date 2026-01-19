import express from "express";
import cors from "cors";
import { config } from "./config/env.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Open Sparkle ERP API" });
});

// API routes
import authRoutes from "./routes/auth.js";
import clientOnboardingRoutes from "./routes/clientOnboarding.js";

app.use("/api/auth", authRoutes);
app.use("/api/client-onboarding", clientOnboardingRoutes);

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  console.log(`📦 Environment: ${config.nodeEnv}`);
});
