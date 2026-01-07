import express from "express";
import cors from "cors";
import loginRoute from './route/loginRoute.js'

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/loginApp', loginRoute);

app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});