import express from "express";
// import session from "express-session";
import dotenv from "dotenv";
import { connectDB } from "./config/mongoose";
import UserRoutes from '../src/view/registerUserRoute'
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth' , UserRoutes)

// Middleware
// app.use(
//   session({
// //     secret: process.env.SESSION_SECRET!,
// //     resave: false,
// //     saveUninitialized: false,
// //   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
 
// Start Server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});