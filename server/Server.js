import { config } from "dotenv";
import express from "express";
const app = express();
import { connectDB } from "./utils/connectDB.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import auth from "./routes/authRoute.js";
import todos from "./routes/todoRoute.js";
import Swagger from "./utils/Swagger.js";
import credentials from "./middlewares/credentials.js";
import allowedOrigins from "./utils/allowedOrigins.js";

app.use(credentials);

const corpsOtions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== 1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSucessStatus: 200,
  credentials: true,
};

app.use(cors(corpsOtions));

// adds middleware in an Express app to automatically parse JSON payloads from incoming requests and make the data available on req.body.
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", auth);
app.use("/todo", todos);

config();
const PORT = process.env.PORT || 443;
Swagger(app);
connectDB(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});
