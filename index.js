import express from 'express';
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import blogModel from "./Models/blogModel.js";
import blogRoutes from "./Routes/blogRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/256Final', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Unable to connect to MongoDB", err);
});

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.use(express.static(path.join(__dirname, 'frontend'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});

app.listen(port, () => {
    console.log("Server is running")
})

