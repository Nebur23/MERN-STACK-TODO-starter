import { config } from "dotenv";
import express from "express";
const app = express();
import { connectDB } from "./utils/connectDB.js";
config();
const PORT = process.env.PORT || 443;
Swagger(app);
connectDB(() => {
  app.listen( () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});
