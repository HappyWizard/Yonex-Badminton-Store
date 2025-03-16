import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'
import cors from "cors"
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081     // 5000 here is a fall back value in case in the dot env file u forgot to set PORT = 5000 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.resolve();

app.use(express.json()) // allows us to accept JSON data in the req.body
app.use(cors());
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

if (process.env.Node_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
// app.set("view engine", "ejs")
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded({ extended: false }));  // This allows you to handle form data (req.body)

// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});


