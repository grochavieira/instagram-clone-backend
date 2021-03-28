import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";
import routes from "./routes";

mongoose
  .connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database.");
    app.emit("ready...");
  })
  .catch((e) => console.log(e));

const app = express();

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
