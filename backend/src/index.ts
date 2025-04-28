// import express from "express";
// // import session from "express-session";
// import dotenv from "dotenv";
// import { connectDB } from "./config/mongoose";
// import UserRoutes from "../src/view/registerUserRoute";
// dotenv.config();
// import cors from "cors";

// const app = express();

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// app.use(express.json());

// app.use("/api/auth", UserRoutes);

// // Middleware
// // app.use(
// //   session({
// // //     secret: process.env.SESSION_SECRET!,
// // //     resave: false,
// // //     saveUninitialized: false,
// // //   })
// // );
// // app.use(passport.initialize());
// // app.use(passport.session());

// // Start Server
// const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/mongoose";
import UserRoutes from "../src/view/registerUserRoute";
import cors from "cors";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions)); // Use the CORS middleware with options

app.use(express.json());

app.use("/api/auth", UserRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
